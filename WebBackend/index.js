const express = require('express');
const app = express();
const mongo = require('./mongoose/mongo');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const { parseISO, format, addWeeks, addDays, isWithinInterval, addMinutes } = require('date-fns');
const appointSchema = require('./mongoose/schemas/AppSchem');
//MiddleWare
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const twilio = require('twilio');

const refreshDb = require('./refreshDb');

const bodyParser = require('body-parser');

//keys
const credentials = require('./calendarkeys.json');
const settings = require('../settings.json');

const twilioClient = new twilio(settings.accountSid, settings.authToken);

let strat = require('./strategies/google');

refreshDb.checkDates(twilioClient); 
mongo.init();
//Middleware Initialization
app.use( cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'collegeApp',
    keys: ['key1', 'key2']
}
));
//Auth Function
const isLoggedIn = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send(false);
        next()
    } else {
        next();
    }
}

//Initialization
app.use(passport.initialize());
app.use(passport.session());

app.get("/loggedIn", isLoggedIn, (req, res) => {
        return res.send("true");
})

app.get("/", (req, res) => {
    res.send("Hey Hey");
})
app.listen(3001 , () => {
    console.log(`app listening on port 3001`)
})

app.get('/date', (req, res) => {
    res.send(new Date());
})

app.get('/calendar', isLoggedIn, (req, res) => passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calendar.readonly'] }));

app.get('/failed', isLoggedIn, (req, res) => res.send(`You failed to log in`));

app.get('/userInf', isLoggedIn, (req, res) => res.send(req.user));

app.get('/appointments/:id/', isLoggedIn, async (req, res) => {
    let params = req.params.id;
    let appointments = await appointSchema.find({
        Name: params
    });
    res.send(appointments);
});

app.get('/clear', isLoggedIn, (req, res) => {
    res.clearCookie(`collegeApp`);
    return res.redirect("http://localhost:3000/");
});

//Function to get A Calendar Using the Google Calendar API
app.get('/calendar/add/:id/:newTimeAndDate/:name', (req, res) => {
    let id = req.params.id;
    const oauth2Client = new google.auth.OAuth2()
    console.log(`Access Token: ${req.user.accesstoken}`);
    oauth2Client.setCredentials({
        'access_token': req.user.accessToken,
    });
    let calendar = google.calendar({version: 'v3', auth: oauth2Client});
    calendar.events.quickAdd({
        calendarId: id,
        text: `Automated College Appointment - By ${req.params.name}`
    })
}) 


app.post('/calendarInfo/writeReq', isLoggedIn, async (req, res) => {
    let postBody = req.body;
    if(!postBody) return res.send({message: `The POST Request Body is Empty. Please fill it
    with Email, PhoneNumber, Date, Message, and Name`});
    console.log(postBody);
    let endTime = addMinutes(parseISO(postBody.Date), parseInt(postBody.Duration)); 
    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({
        'access_token': req.user.accessToken,
    });
    let calendar = google.calendar({version: 'v3', auth: oauth2Client});
    //Get Calendar
    
    const appointment = new appointSchema({
        _id: mongoose.Types.ObjectId(),
        Email: postBody.Email,
        PhoneNumber: postBody.PhoneNumber,
        Date: postBody.Date,
        Message: postBody.Message,
        Name: postBody.Name,
        Status: "pending",
        EndTime: endTime
      });
      appointment.save().then(results => {
        if(results) {
            console.log(endTime.toISOString());
            console.log(parseISO(postBody.Date).toISOString());
            calendar.events.inse
            calendar.events.insert({
                calendarId: 'primary',
                requestBody: {
                    description: `College Counseling: ${postBody.Message}`,
                start: {
                    dateTime: parseISO(postBody.Date).toISOString(),
                    timeZone: 'America/New_York',
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: 'America/New_York'
                },
                
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                      {'method': 'email', 'minutes': 24 * 60},
                      {'method': 'popup', 'minutes': 10}
                    ]
                  },
                }
            });
          /*  twilioClient.messages.create({
                body: `Hello ${postBody.Name}!
You have successfully made an appointment with the CHC College Counseling Office on: 
${format(parseISO(postBody.Date), "MM/dd/yyyy 'at' hh:mmaaaaa'm")}! 
To See Your Appointment Details, go to the website!`,
                to: `+1${postBody.PhoneNumber}`,
                from: "+16109917922"
            })    */
            res.sendStatus(200);
        }
    })
})

app.get('/calendar/:id', isLoggedIn, (req, res) => {
    let id = req.params.id;
    const oauth2Client = new google.auth.OAuth2()
    console.log(req.user);
    console.log(`Access Token: ${req.user.accessToken}`);
    oauth2Client.setCredentials({
        'access_token': req.user.accessToken,
    });
    let calendar = google.calendar({version: 'v3', auth: oauth2Client});
    //Get Calendar
    calendar.events.list({
        calendarId: id,
        timeMax: addDays(new Date(), 7).toISOString(), // Let's get events for one week
        timeMin: addDays(new Date(), 0).toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, content) => {
        //PROBLEM: Calendar Not Found.
        if(err) res.send({message: `${err}. Can not access ${req.params.id}'s Calendar`});
        else res.send(content);
    })
})

//Logout of Passport Session
app.get('/logout', isLoggedIn, (req, res) => {
    req.session = null;
    res.redirect('/google');
    req.logout();
})
// Authenticate with Passport OAuth
app.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly', 'profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', {  failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('http://localhost:3000/Dashboard');
  });