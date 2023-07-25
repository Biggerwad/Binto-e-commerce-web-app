import jwt from "jsonwebtoken";
import Admin from "../model/Admin.model.js";
import bcrypt from "bcrypt";
import Items from "../model/items.model.js";

/* Admin sign up */
export const adminSignup = async (req, res) => {
    const { firstname,
        lastname,
        email,
        password,
    } = req.body;

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email: email })
    } catch (err) {
        console.log(err);
    }

    if (existingAdmin) {
        res.status(403).json({ error: "Admin already exists" });
    }
    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt)

    const newAdmin = new Admin({
        firstname,
        lastname,
        email,
        password: hash,
        cart: {},
    })

    try {
        await newAdmin.save()
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json(newAdmin);
}

/* SIGN IN */
export const adminSignin = async (req, res) => {
    const { email, password } = req.body;
    let admin;
    try {
        admin = await Admin.findOne({ email })
        if (!admin) {
            res.status(403).json({ msg: "Admin not found!" });
        }
        const token = jwt.sign({ admin }, process.env.JWT_SECRET, {
            // expire in 30 mins
            expiresIn: 1000 * 60 * 30,
        })
        res.status(200).json({ token });
    } catch (err) {

    }
}

/* ADD ITEMS */
export const addItem = async (req, res) => {
    const { title,
        price,
        image,
        description } = req.body;
    const newItem = new Items({
        title,
        price,
        image,
        description
    });

    try {
        const exists = await Items.findOne({ title: title, price: price })

        if (exists) {
            return res.status(403).json({ msg: "Item exists already" });
        } else {
            await newItem.save();
            res.status(201).json({ msg: "DONE!" });
        };

        const items = await Items.find({}, { _id: 0, __v: 0 });
        return res.status(201).json(items);
    } catch (err) {
        console.log(err);
    }
    // Todo later, check if item exist, if it does increment, if ordered decerement
}

/* DELETE ITEM */
export const deleteItem = async (req, res) => {
    const { title, price } = req.body

    try {
        const items = await Items.find();
        const exists = await Items.findOne({ title, price });

        if (!exists) {
            res.status(403).json({ msg: "Item does not exist!" });
        } else {
            await exists.deleteOne({ title: title, price: price });
            return res.status(200).json({ msg: "DONE" })
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

/* UPDATE ITEM */
export const updateItem = async (req, res) => {
    const { id,
        newtitle,
        newprice,
        newimage,
        newdescription } = req.body;

    try {
        // const filter = { _id: id }
        // const update = 

        //This section gives the same object without anything updated
        const updateResult = await Items.findByIdAndUpdate(id, {
            title: newtitle,
            price: newprice,
        });
        if (!updateResult) {
            return res.status(401).json({ msg: "Error Updating" })
        } else {
            return res.status(200).json({ updateResult });
        }

        // if (updateResult.modifiedCount === 1) {
        //     res.json({ updateResult })
        // } else {
        //     res.send("Failed");
        // }

    } catch (err) {
        res.send(err);
    }

}

/* VIEW All item */
export const getAllItems = async (req, res) => {
    let items;
    try {
        // Couldn't return the data in the model format.
        items = await Items.find({}, { __v: 0 }).sort({ price: 1 });
        return res.status(200).json(items);
    } catch (err) {
        console.log(err)
    }
} 