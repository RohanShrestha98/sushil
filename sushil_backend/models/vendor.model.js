const mongoose = require("mongoose")

const vendorSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Vendor", vendorSchema)