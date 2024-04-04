const EsewaPaymentLogs = require("../models/paymentlog.modal");

  const addLogPayment =(req,res)=>{
    const paymentLog = {
        data:req?.body,
        user:req?.user,
    }
    EsewaPaymentLogs.create(paymentLog)
      .then((response) => {
        console.log("response",response)
        return res.status(201).send({message:"Payment log stored in database"});
      })
      .catch((err) => {
        console.log('Failed storing Error log: ', err);
      });
  }

const paymentLogs= async(req, res) => {
        try {
            const payment = await EsewaPaymentLogs.find();
            return res.status(200).json(payment);
        } catch (err) {
            return res.status(500).json({ message: "internal server error" })
        }
    }

const verifyEsewaPayment =
(req, res) => {
    let { oid, amt, refId } = req?.body;
    let scd = process.env.ESEWA_SCD;
  
    if (!oid) return res.status(500).send({ message: 'oid is missing.' });
    if (!refId) return res.status(500).send({ message: 'refId is missing.' });
  
    let paymentData = {
      module_id: req.moduleId ,
      userId: req?.user.id,
      merchantType: 'esewa',
    //   esewaPId: pid ,
    //   esewaRId: rid ,
      amount: amt ,
    };

    console.log("paymentData",paymentData)
  
    let proudctDetails = (pid).split('-');
    let newAmount = proudctDetails[2];
  
    verifyEsewaPayment({ amt, rid, scd, pid })
      .then((esewaRes) => {
        if (!(esewaRes && esewaRes.includes('Success'))) {
          return res.status(500).send({ message: 'Esewa verify failure.' });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error, message: 'Error verifying esewa payment.' });
      });
    }



// const verifyKhaltiPayment = (data) => {
//   let config = {
//     headers: {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//     },
//   };
//   return axios.post('https://khalti.com/api/v2/payment/verify/', data, config);
// };


module.exports = {
    verifyEsewaPayment,
    addLogPayment,
    paymentLogs
}
