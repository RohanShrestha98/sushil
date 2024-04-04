const {Router} = require('express');

const router = Router();

const UserRoute = require('./user.route');
const VendorRoute= require('./vendor.route');
const AdminRoute = require('./admin.route');
const PackageRoute= require('./package.route');
const VehicleRoute = require("./vehicle.route");
const VehicleRequest = require("./vehicleRequest.route");
const EsewaPaymentRoute = require("./esewapayment.route");

router.use('/user', UserRoute);
router.use('/vendor', VendorRoute);
router.use('/admin', AdminRoute);
router.use('/package', PackageRoute);
router.use("/vehicle", VehicleRoute);
router.use("/request", VehicleRequest);
router.use("/esewa", EsewaPaymentRoute)

module.exports = router;