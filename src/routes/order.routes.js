import express from "express";
import { createOrder, deleteOrder } from "../controllers/order.controller.js";
import validUser from "../middleware/validUser.js";

const router = express.Router();


router.post("/createOrder", validUser, createOrder);
router.delete("/deleteOrder", validUser, deleteOrder);

export default router;  