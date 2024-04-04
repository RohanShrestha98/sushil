const { Router } = require('express');
const router = Router();


const controller = require('../controllers/vehicleRequest.controller');

router.get("/", controller.getRequests);
router.post("/create", controller.createRequest);
router.delete('/remove/:id', controller.deleteRequest);
router.get("/approve/:id", controller.approveRequest);
router.get("/reject/:id", controller.rejectRequest);

module.exports = router;