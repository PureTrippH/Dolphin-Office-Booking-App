const appointSchema = require('./mongoose/schemas/AppSchem');
const { parseISO, format, addWeeks, addMinutes } = require('date-fns');
const settings = require('../settings.json');
const twilio = require('twilio');

const twilioClient = new twilio(settings.accountSid, settings.authToken);

exports.checkDates = async() => {
    let newDate = new Date;
    newDate = addMinutes(newDate, 11);
    /*Find All Declined Appointments, Send a Text, then delete from Database*/
    let detectModified = await appointSchema.find({
        Status: "modified"
    })
    detectModified.forEach(async entry => {
        if(!entry.HasNotified) {
        twilioClient.messages.create({
            body: `Hello ${entry.Name}!
We have decided to modify your appointment! 
Please check the website and agree to the modifications.
If you can not make it, please decline the changes and submit your own date.`,
            to: `+1${entry.PhoneNumber}`,
            from: "+16109917922"
        });
        let test = await appointSchema.findOneAndUpdate({
            Email: entry.Email
        }, {
            HasNotified: true,     
        }).then(res => {
            console.log(res);
        })
        }
    });
    
    let declinedApps = await appointSchema.find({
        Status: "declined"
    })

    declinedApps.forEach(async entry => {
        twilioClient.messages.create({
            body: `Hello ${entry.Name}!
Unfortunately, Your Appointment was Cancelled! 
If you have any questions, please send us an email.`,
            to: `+1${entry.PhoneNumber}`,
            from: "+16109917922"
        });
        await appointSchema.deleteMany({
            Date: entry.Date,
            Email: entry.Email
        });
    })

    let res = await appointSchema.find({
        Date: {
            $lt: newDate
        }
    })

    let accepted = await appointSchema.find({
        Status: "accepted"
    })
    accepted.forEach(async entry => {
        if(!entry.HasNotified) {
            twilioClient.messages.create({
                body: `Hello ${entry.Name}!
Your Appointment for ${entry.Date} 
has been accepted! Please get there 5-10 minutes before the appointment.
Thank you!`,
                to: `+1${entry.PhoneNumber}`,
                from: "+16109917922"
            });
            await appointSchema.findOneAndUpdate({
                Date: entry.Date,
                Email: entry.Email
            }, {
                HasNotified: true,     
            })
            }
    }) 

    /*Find All Accepted appointment that expire, send a text
    If none found, Delete all Expired Pending without text*/


    res.forEach(async entry => {
        if(entry.Status.toLowerCase()=="accepted") {
        twilioClient.messages.create({
            body: `Hello ${entry.Name}!
Your appointment with the CHC College Counseling Office is in 10 minutes! 
Please go to the College Counseling Room for Your Meeting with a Counselor.`,
            to: `+1${entry.PhoneNumber}`,
            from: "+16109917922"
            });
        }
            await appointSchema.deleteMany({
                Date: entry.Date,
                Email: entry.Email
            });
    })
    return setTimeout(this.checkDates, 1000 * 30);
};