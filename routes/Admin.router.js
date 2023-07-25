import express, { Router } from "express";
import { addItem, adminSignin, adminSignup, deleteItem, getAllItems, updateItem } from "../controllers/admin.controller.js";;
import { getAllUsers } from "../controllers/User.controller.js";
import isVerified from "../middleware/auth.js";
export const adminRouter = express.Router();

/**
 * @desc ..
 * @method get
 * @api public
 */
adminRouter.get("/", getAllUsers)
adminRouter.get('/signin', adminSignin)
adminRouter.get('/allitems', getAllItems)

/* UPDATE */

// signup Admin
adminRouter.post('/signup', adminSignup)
// Add items
adminRouter.post('/additem', isVerified, addItem)
/* DELETE ITEM */
adminRouter.delete('/deleteitem', isVerified, deleteItem)
adminRouter.post('/updateitem', isVerified, updateItem)
// adminRouter.patch("/", updateItem)
// adminRouter.post
// adminRouter.patch
// adminRouter.delete