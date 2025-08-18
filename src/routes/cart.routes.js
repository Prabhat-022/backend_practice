import express from "express";
import { addItemInCart, removeItemFromCart } from "../controllers/cart.controller.js";
import validUser from "../middleware/validUser.js";

const router = express.Router();

router.post("/addItemInCart", validUser, addItemInCart);
router.post("/removeItemFromCart", validUser, removeItemFromCart);

export default router;