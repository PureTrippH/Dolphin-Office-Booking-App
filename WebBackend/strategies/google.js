const { deserializeUser } = require('passport');
const passport = require('passport');
const settings = require('../../settings.json');
const GoogleStrat = require('passport-google-oauth20');
const google = require('googleapis');
const myStrat = GoogleStrat.Strategy;

passport.serializeUser((user, done) => {
    let sessionUser = {
        _id: user.googleID,
        accessToken: user.accesstoken,
        name: user.name,
        pic_url: user.pic_url,
        email: user.email
    }

    done(null, sessionUser)
});

passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser)
})

passport.use(new myStrat({
    clientID: settings.client_ID,
    clientSecret: settings.client_secret,
    callbackURL: "http://localhost:3001//google/callback",
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly']
}, (token, tokenSecret, profile, done) => {

    //save data in session
    user = {
        "accesstoken": token,
        'googleID': profile.id,
        'name': profile.displayName,
        'pic_url': profile._json.picture,
        'email': profile._json.email
    }
    console.log(user);

    done(null, user)
}));

