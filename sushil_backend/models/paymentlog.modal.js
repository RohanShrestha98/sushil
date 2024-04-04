
const mongoose = require("mongoose")

const esewaPaynmentLogSchema = mongoose.Schema({
    merchantType: {
        type: String,
        allowNull: false,
      },
      status: {
        type: String,
        allowNull: false,
      },
      userId: {
        type: Number,
        allowNull: false,
      },
      esewaRId: {
        type:String,
        allowNull: true,
      },
      module_id: {
        type: String,
        allowNull: false,
      },
})

module.exports = mongoose.model("EsewaPaymentLogs", esewaPaynmentLogSchema)
