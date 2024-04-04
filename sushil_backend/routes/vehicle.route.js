const { Router } = require('express');
const router = Router();

const controller = require('../controllers/vehicle.controller');

router.get("/", controller.getVehicles);
router.get("/:id", controller.getVehicleById);
router.post("/add", controller.addVehicle);
router.put("/edit/:id", controller.editVehicle);
router.delete("/remove/:id", controller.deleteVehicle);
router.get("/search/:category/:max_budget", controller.getVehicleByCategoryAndBudget);

module.exports = router;