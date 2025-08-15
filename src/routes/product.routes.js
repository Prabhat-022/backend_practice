import { getProduct, createProduct, InsertAlltheproduct, getSingleProduct, deleteProduct } from "../controllers/product.controllers.js"
import express from "express";
import validUser from "../middleware/validUser.js";

const route = express.Router();

route.get("/getProducts", getProduct);
route.post("/product", validUser, createProduct);
route.post("/products", validUser, InsertAlltheproduct);
route.get("/product/:id", getSingleProduct);
route.delete("/product/:id", validUser, deleteProduct);

export default route;
