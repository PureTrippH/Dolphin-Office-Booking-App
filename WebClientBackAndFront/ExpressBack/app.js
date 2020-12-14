const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express()
//MiddleWar

require('./strategies/google');

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'collegeApp',
    keys: ['key1', 'key2']
}
));


app.get("/", (req, res) => {
    res.send("Hey Hey");
})
app.listen(3001 , () => {
    console.log(`app listening on port 3001`)
})
''
app.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


  const isLoggedIn = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
}