const appointSchema = require('./mongoose/schemas/AppSchem');
const { parseISO, format, addWeeks, addMinutes } = require('date-fns');
const settings = require('../settings.json');
const twilio = require('twilio');

const twilioClient = new twilio(settings.accountSid, settings.authToken);

exports.checkDates = async() => {
    let newDate = new Date;
    newDate = addMinutes(newDate, 11);
    let res = await appointSchema.find({
        Date: {
            $lt: newDate
        }
    })
    console.log(res);
    res.forEach(async entry => {
        /*
        twilioClient.messages.create({
            body: `Hello ${entry.Name}!
Your appointment with the CHC College Counseling Office is in 10 minutes! 
Please go to the College Counseling Room for Your Meeting with a Counselor.`,
            to: `+1${entry.PhoneNumber}`,
            from: "+16109917922"
        });
        */
        await appointSchema.deleteMany({
            Date: entry.Date,
            Email: entry.Email
        });

    })
    return setTimeout(this.checkDates, 1000 * 30);
};