import express from "express";
import { userSignin, userSignup, getAllUsers} from "../controllers/User.controller.js";

export const userRouter = express.Router();

/* READ */
userRouter.get('/', getAllUsers)
userRouter.get('/login', userSignin);

/* UPDATE */
userRouter.post('/signup', userSignup);