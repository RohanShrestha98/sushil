const User = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const CurrentUsers = require("../models/user.model")

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({ message: "user not found" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "login success",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const checkExistingEmail = await User.findOne({ email });

    if (checkExistingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getNumberOfUsers = async (req, res) => {
    try{
        const currenetUsers = await CurrentUsers.find();

        if(!currenetUsers) {
            return res.status(200).json({
                message: "no users found",
            })
        }

        return res.status(200).json({
            noOfUsers: currenetUsers.length
        })

    }catch(err){
        return res.status(500).json({ message: "internal server error" });
    }
}
module.exports = {
  login,
  signup,
  getNumberOfUsers
};
