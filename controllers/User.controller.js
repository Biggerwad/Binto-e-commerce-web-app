import User from "../model/User.model.js";
import bcrypt from "bcrypt";

/* GET ALL USERS */
export const getAllUsers = async (req, res) => {
    let users ;
    try {
        users = await User.find({});
        return res.status(200).json(users);
    } catch (err) {
        console.log(err)
    }
}

/* User sign up */
export const userSignup = async (req, res) => {
    const { firstname,
        lastname,
        email,
        password,
    } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err);
    }

    if (existingUser) {
        res.status(403).json({ error: "User already exists" });
    }
    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
        firstname,
        lastname,
        email,
        password: hash,
    })

    try {
        await newUser.save()
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json(newUser);
}

/* USER SIGN IN */
export const userSignin = async (req, res, next) => {
    const {
        email,
        password,
    } = req.body;

    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(402).json({ message: "User not found in DB" })
    }
    let userPassword;
    try {
        userPassword = bcrypt.compareSync(password, user.password);
    } catch (err) {
        console.log(err);
    }

    if (!userPassword) {
        return res.status(401).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
    next();
}