import express, { Router } from "express";
import { addItem } from "../controllers/admin.controller.js";;

export const adminRouter = express.Router();

/* READ */
// adminRouter.get("/", )

/* UPDATE */
// Add items
adminRouter.post('/additem', addItem)
// adminRouter.post
// adminRouter.patch
// adminRouter.delete