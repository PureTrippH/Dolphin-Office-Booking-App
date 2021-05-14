const express = require('express');
const app = express();
const mongo = require('./mongoose/mongo');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const { addWeeks, addDays } = require('date-fns');
const appointSchema = require('./mongoose/schemas/AppSchem');
//MiddleWare
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');

//keys
const credentials = require('./calendarkeys.json');
const settings = require('../settings.json');

let strat = require('./strategies/google');

mongo.init();
//Middleware Initialization
app.use( cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))


app.use(cookieSession({
    name: 'collegeApp',
    keys: ['key1', 'key2']
}
));
//Auth Function
const isLoggedIn = (req, res, next) => {
    if(!req.user) {
        res.redirect('http://localhost:3000/');
        res.status(401).send("NOpe");
    } else {
        next();
    }
}

//Initialization
app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
    res.send("Hey Hey");
})
app.listen(3001 , () => {
    console.log(`app listening on port 3001`)
})

app.get('/calendar', isLoggedIn, (req, res) => passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calendar.readonly'] }));

app.get('/failed', isLoggedIn, (req, res) => res.send(`You failed to log in`));

app.get('/userInf', isLoggedIn, (req, res) => res.send(req.user));


app.get('/clear', isLoggedIn, (req, res) => {
    res.clearCookie(`collegeApp`);
    return res.redirect("http://localhost:3000/");
});

//Function to get A Calendar Using the Google Calendar API
app.get('/calendar/add/:id/:newTimeAndDate/:name', isLoggedIn, (req, res) => {
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
    if(!req.body) res.send({message: `${err}. The POST Request Body is Empty. Please fill it
    with Email, PhoneNumber, Date, Message, and Name`})
    await appointSchema.create({
        _id: mongoose,
        Email: postBody.email,
        PhoneNumber: postBody.phoneNum,
        Date: postBody.date,
        Message: postBody.message,
        Name: postBody.name,
    })
})

app.get('/calendar/:id', isLoggedIn, (req, res) => {
    let id = req.params.id;
    const oauth2Client = new google.auth.OAuth2()
    console.log(`Access Token: ${req.user.accesstoken}`);
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
    req.logout();
    res.redirect('h');
})
// Authenticate with Passport OAuth
app.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly', 'profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', {  failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('http://localhost:3000/Dashboard');
  });