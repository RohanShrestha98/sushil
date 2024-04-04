const { Router } = require('express');
const router = Router();


const packageController = require('../controllers/package.controller');

router.post('/add', packageController.addPackage);
router.delete('/delete/:id', packageController.deletePackage);
router.get('/',packageController.getPackages);


module.exports = router;