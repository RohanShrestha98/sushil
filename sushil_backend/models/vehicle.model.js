const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleModal: {
    type: String,
    required: true,
  },
  displayImage:{
    type: String,
    required: true
  },
  perDayPrice: {
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true,
    default: false,
  },
  category: {
    type: String,
    enum: ["CAR", "BIKE"],
    required: true
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
