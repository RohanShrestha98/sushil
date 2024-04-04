const VehicleRequest = require("../models/vehicleRequest.model");
const Vehicle = require("../models/vehicle.model");
const vehicleModel = require("../models/vehicle.model");

const createRequest = async (req, res) => {
  const { username, userContact, address, vehicleNumber, date, duration } =  req.body;

  if (
    !username || 
    !userContact ||
    !address ||
    !vehicleNumber ||
    !date ||
    !duration
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newRequest = new VehicleRequest({
      userName: username,
      userContact,
      address,
      vehicleNumber,
      date,
      duration,
    });

    await newRequest.save();

    return res.status(200).json({ message: "request created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const request = await VehicleRequest.findOneAndDelete({ _id: id });

    if (!request) {
      return res.status(400).json({ message: "request not found" });
    }

    return res.status(200).json({
      message: "request deleted",
    });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await VehicleRequest.find().sort("date");
    const vehicles = await Vehicle.find();

    if(!requests){
        return res.status(404).send('No requests found')
    }

    if(!vehicles){
        return res.status(404).send('No vehicle data available')
    }

    const requestData = requests.map(request=> {
        let vehicle = vehicles.filter((v)=> v.vehicleNumber === request.vehicleNumber);
        console.log(vehicle)
        return {...request._doc, vehicleModel: vehicle[0]?.vehicleModal}
    })

    return res.status(200).json({ requestData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const approveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let request = await VehicleRequest.findOneAndUpdate(
      { _id: id },
      { approved: "approved" }
    );

    if (!request) {
      return res.status(400).json({ message: "request not found" });
    }

    return res.status(200).json({ message: "request updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "internal server error" });
  }
};

const rejectRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let request = await VehicleRequest.findOneAndUpdate(
      { _id: id },
      { approved: "rejected" }
    );

    if (!request) {
      return res.status(400).json({ message: "request not found" });
    }

    return res.status(200).json({ message: "request updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "internal server error" });
  }
};

module.exports = {
  createRequest,
  deleteRequest,
  getRequests,
  approveRequest,
  rejectRequest,
};
