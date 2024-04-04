const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "missing fields" })
    }


    try {
        const checkUser = await User.findOne({ email });

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
            token, 
            phoneNumber: checkUser.phoneNumber
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}


const signup = async (req, res) => {
    const { email, password, phoneNumber } = req.body;


    if (!email || !password || !phoneNumber) {
        return res.status(400).json({ message: "missing fields" })
    }


    try {

        const checkExistingEmail = await User.findOne({ email });
        const checkExistingPhoneNumber = await User.findOne({phoneNumber});

        if (checkExistingEmail) {
            return res.status(400).json({ message: "email already exists" })
        }

        if(checkExistingPhoneNumber){
            return res.status(400).json({message: "phone number already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            phoneNumber
        })

        await newUser.save();

        return res.status(201).json({ message: "user created" })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}


module.exports = {
    login,
    signup
}