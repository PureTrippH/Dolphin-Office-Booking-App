const mongoose = require('mongoose');
const mongooseLink = require('../../settings.json').mongooseLink

exports.init = () => {
    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        poolSize: 5,
        connectTimeoutMS: 10000,
        family: 4,
        useFindAndModify: false,
    };
    mongoose.connect(mongooseLink, dbOptions);
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose has successfully connected!');
})


mongoose.connection.on('disconnected', () => {
    console.log('Mongoose has disconnected! Restarting Connection!');
    this.init();
})
