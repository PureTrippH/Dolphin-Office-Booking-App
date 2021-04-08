const { deserializeUser } = require('passport');
const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20');
const myStrat = GoogleStrat.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new myStrat({
    clientID: "246325643664-4dcam77s8o9djtp260n1dgahhkaeq08j.apps.googleusercontent.com",
    clientSecret: "LH6JqTGizWnfI-xl5bSD2mjL",
    callbackURL: "http://localhost:3001/google/callback"
},
    (token, tokenSecret, profile, done) => {
       return done(null, profile);
    }
))