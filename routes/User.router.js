import express from "express";
import { userSignin, userSignup, getAllUsers, userSignout } from "../controllers/User.controller.js";
import isVerified from "../middleware/auth.js";

export const userRouter = express.Router();

/* READ */
userRouter.get('/', isVerified, getAllUsers);
userRouter.get('/signin', isVerified, userSignin);
userRouter.get('/signout', isVerified, userSignout);

/* UPDATE */
userRouter.post('/signup', userSignup);