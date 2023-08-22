import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connect(URI).then(() => {
    server.listen(PORT, () => {
        console.log('Server Running')
    });
})
    .then(() => {
        console.log('All set sir.');
    })
    .catch((err) => {
        console.log(err)
    });