const mongoose = require("mongoose")

const packageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    display_image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("Package", packageSchema)