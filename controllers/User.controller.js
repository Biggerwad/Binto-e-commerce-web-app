import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Items from "../model/items.model.js";

/* GET ALL USERS */
export const getAllUsers = async (req, res) => {
    let users;
    try {
        // Couldn't return the data in the model format.
        users = await User.find({}, { _id: 0, __v: 0 });
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
        cart: {},
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

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found in DB" })
        }

        const userPassword = bcrypt.compareSync(password, user.password);
        if (!userPassword) {
            return res.status(401).json({ msg: "User not found" });
        };
        const token = jwt.sign({ user }, process.env.JWT_SECRET);

        return res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


}


/* ADD TO CART */
export const addToCart = async (req, res) => {
    const { email, item } = req.body;

    try {
        const user = await User.findOne(email);
        if (!user) {
            return res.send('Login with right email!');
        }
        const cItem = await Items.findOne({ title: item });
        if (!cItem) {
            res.status(403).json({ msg: "I tem not found" });
        }
        /* former cart items 
        then add new ones */

        const currentItem = [...user.cart.items];
        // check if item exists in cart already
        // const exists = currentItem.findIndex((x) => {
        //     return x.item.toString() === cItem.toString();
        // });

        // if (exists < 0) {
        //     currentItem.push({ item: cItem });
        // }

        // user.cart = {
        //     items: currentItem,
        // }
        user.save();
        return res.status(201).json(currentItem);
    } catch (err) {
        return res.send(err);
    }
}

/* USER SIGNOUT */
export const userSignout = async (req, res) => {
    const {
        email,
    } = req.body;

    let user;
    try {
        user = await User.findOne({ email })
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    User.findOneAndUpdate({ email: user.email }, { online: false }, {
        upsert: true
    })

    // user.online = false;
    return res.status(200).json(user);
}