const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: String,
    PhoneNumber: String,
    Date: {
        type: Date,
        required: true
    },
    Message: String,
    Name: String,
    Status: String,
    EndTime: Date,
    HasNotified: Boolean,
})

module.exports = mongoose.model("Appointment", appSchema, 'appointments');