const { deserializeUser } = require('passport');
const passport = require('passport');
const settings = require('../../settings.json');
const GoogleStrat = require('passport-google-oauth20');
const google = require('googleapis');
const myStrat = GoogleStrat.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new myStrat({
    clientID: settings.client_ID,
    clientSecret: settings.client_secret,
    callbackURL: "http://localhost:3001/google/callback"
},
    (token, tokenSecret, profile, done) => {
        console.log(profile);
        done(null, profile, {"token": token, "token_secret": tokenSecret});
    })
)

