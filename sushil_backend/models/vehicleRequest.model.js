const mongoose = require("mongoose");

const vehicleRequestSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userContact: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    approved: {
        type: String,
        required: true,
        default: "Pending"
    }
})

module.exports = mongoose.model("VehicleRequest", vehicleRequestSchema);