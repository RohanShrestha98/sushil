const { Router } = require('express');
const router = Router();


const adminController = require('../controllers/admin.controller');

router.post('/login', adminController.login);
router.post('/signup', adminController.signup);
router.get('/get-user-number', adminController.getNumberOfUsers);


module.exports = router;