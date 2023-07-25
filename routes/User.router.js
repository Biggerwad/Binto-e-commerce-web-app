import express from "express";
import { userSignin, userSignup, getAllUsers, userSignout, addToCart } from "../controllers/User.controller.js";
import isVerified from "../middleware/auth.js";

export const userRouter = express.Router();

/* READ */
userRouter.get('/', getAllUsers);
userRouter.get('/signin', userSignin);
// userRouter.get('/signout', userSignout);

/* UPDATE */
userRouter.post('/addtocart', addToCart)
userRouter.post('/signup', userSignup); 
// isVerified,