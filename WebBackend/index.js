const express = require('express');
const app = express();
const mongo = require('./mongoose/mongo');
const fetch = require('node-fetch');

//MiddleWare
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');


require('./strategies/google');

mongo.init();
app.use( cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))
  
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'collegeApp',
    keys: ['key1', 'key2']
}
));

//Auth Function
const isLoggedIn = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect('http://localhost:3000/');
        res.status(401).send(req);
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


app.get('/failed', isLoggedIn, (req, res) => res.send(`You failed to log in`));

app.get('/userInf', isLoggedIn, (req, res) => res.send(req.user._json));

app.get('/clear', isLoggedIn, (req, res) => {
    res.clearCookie(`collegeApp`);
    return res.redirect("http://localhost:3000/");
});

app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
})

app.get("/google", passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('http://localhost:3000/Dashboard');
  });