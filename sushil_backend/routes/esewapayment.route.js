const { Router } = require('express');
const router = Router();


const { verifyEsewaPayment ,paymentLogs,addLogPayment} = require('../controllers/esewapayment.controller');



router.get('/payment/logs', paymentLogs);
router.post('/verify-payment', verifyEsewaPayment);
router.post('/add-payment-log', addLogPayment);

module.exports = router;
