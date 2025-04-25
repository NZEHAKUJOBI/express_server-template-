const bcyrpt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
    const { username, password, first_name, last_name, email} =req.body;
    const ValidationErrors = validateUserInput({
        username,
        password,
        first_name,
        last_name,
        email
    });
    if (ValidationErrors) {
    return res.status(400).json({error: ValidationErrors})
    }
    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({error: "Username already existed"});
        }
        const hashedPassword = await bcyrpt.hash(password, 10)
        const user = new User({
            username,
            password: hashedPassword,
            first_name,
            last_name,
            email
        });
        await user.save();
        return res 
        .status(201)
        .json({ message: "User registered Succefull", user})
    }catch (err) {
        console.log(" Error registering user", err);
        return res 
        .status(500)
        .json({error: "error registering user", details: err.message});
    }


};

function validateUserInput({
    username,
    password,
    first_name,
    last_name,
    email
}){
    if (!username || !password || !first_name || !last_name || !email){
        return "username, password, first name, lastname  and email are all required";
    
    }
    if (username.length < 5) {
        return ("username must be at least 5 characters");
    }
    if (password.lenght < 8) {
        return "password must be at least 8 characters";
    }
    if (!email.includes("@")) {
        return "A valid email address is required";
    }
    return null;
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send("invalid username or password")
        }
        const isPasswordValid = await bcyrpt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400),send("Invalid username or password")
        }
        const token =jwt.sign(
            { username: user._id, role: user.role},
            SECRET_KEY,
            {expiresIn: "6h"}

        );
        const { ...other } = user._doc;

        res.json({token, ...other});
    } catch (err) {
        console.error("error Loggin in user:", err);
        res.status(500).send("erro logging in user ")
    }
};