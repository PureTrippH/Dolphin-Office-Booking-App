const express = require('express');
const app = express();
const mongo = require('./mongoose/mongo');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const { addWeeks } = require('date-fns');
//MiddleWare
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');

//keys
const credentials = require('./calendarkeys.json');
const settings = require('../settings.json');

let strat = require('./strategies/google');

mongo.init();
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
    if(req.user.id) {
        next();
    } else {
        res.redirect('http://localhost:3000/');
        res.status(401).send("NOpe");
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
passport.transformAuthInfo

app.get('/calendar', isLoggedIn, (req, res) => passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calendar.readonly'] }));

app.get('/failed', isLoggedIn, (req, res) => res.send(`You failed to log in`));

app.get('/userInf', isLoggedIn, (req, res) => res.send(req.user._json));


app.get('/clear', isLoggedIn, (req, res) => {
    res.clearCookie(`collegeApp`);
    return res.redirect("http://localhost:3000/");
});

app.get('/calendar/:id', isLoggedIn, (req, res) => {
    let id = req.params.id;
    let calendar = google.calendar({version: 'v3', auth: settings.APIKey});
    calendar.events.list({
        calendarId: 'jmhanley22@student.capehenry.org',
        timeMax: addWeeks(new Date(), 1).toISOString(), // Let's get events for one week
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, content) => {
        console.log(err);
        if(err) res.send({message: `${err}. Can not access ${req.params.id}'s Calendar`});
    })
})

app.get('/google/keys', 
  passport.authenticate('google', {  failureRedirect: '/failed' }),
    (req, res)=> {
        res.send(req.authInfo);
    }
);

app.get('/logout', isLoggedIn, (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('h');
})
app.get("/google", passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'] }));

app.get('/google/callback', 
  passport.authenticate('google', {  failureRedirect: '/failed' }),
  function(req, res) {
    google.auth.getAccessToken();
    res.redirect('http://localhost:3000/Dashboard');
  });