const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express()
//MiddleWare

require('./strategies/google');

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

app.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('http://localhost:3000/Dashboard');
  });