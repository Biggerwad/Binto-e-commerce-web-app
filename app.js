import express from 'express';
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from './routes/User.router.js';
import bodyParser from 'body-parser';
import { adminRouter } from './routes/Admin.router.js';

export const app = express();

app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json())

/* Routers will be mounted here */
app.use('/user', userRouter);
app.use('/admin', adminRouter);