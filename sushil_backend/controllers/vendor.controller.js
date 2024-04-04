const Vendor = require("../models/vendor.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");

const login = async (req, res) => {
    const {email, password} = req.body;

    
    if (!email || !password) {
        return res.status(400).json({ message: "missing fields" })
    }


    try {
        const checkUser = await Vendor.findOne({ email });

        if (!checkUser) {
            return res.status(400).json({ message: "user not found" })
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if (!checkPassword) {
            return res.status(400).json({ message: "invalid password" })
        }

        const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        return res.status(200).json({
            message: "login success",
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}


const signup = async (req, res) => {
    const {username, email, password, phoneNumber, image }   = req.body;
    
    if(!username | !email | !password | !phoneNumber | !image){
     return res.status(400).json({
         message: "Missing fields"
     })
    }

    try{
        const checkUsername = await Vendor.findOne({username});

        if(checkUsername){
            return res.status(400).json({
                message: "Username already exists"
            })
        }

        const checkEmail = await Vendor.findOne({email});

        if(checkEmail){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const checkPhoneNumber = await Vendor.findOne({phoneNumber});

        if(checkPhoneNumber){
            return res.status(400).json({
                message: "Phone number already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10) ;

        const newVendor = new Vendor({
            password: hashedPassword,
            email,
            phoneNumber,
            username,
            image
        })

        await newVendor.save()

        return res.status(200).json({
            message: "Signup successful"
        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }

}


module.exports = {
    login,
    signup
}