const { Router } = require('express');
const router = Router();


const vendorController = require('../controllers/vendor.controller');

router.post('/login', vendorController.login);
router.post('/signup', vendorController.signup);


module.exports = router;