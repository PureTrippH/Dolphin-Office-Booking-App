const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: String,
    PhoneNumber: String,
    Date: String,
    Message: String,
    Name: String,
})

module.exports = mongoose.model("Appointment", appSchema, 'appointments');