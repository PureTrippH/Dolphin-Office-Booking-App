const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: String,
    PhoneNumber: String,
    Date: String
})

module.exports = mongoose.model("Appointment", appSchema, 'appointments');