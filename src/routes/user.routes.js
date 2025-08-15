import express from "express";
import {loginUser, registerUser, getSingleUser, getAllUsers, updateUser, deleteAllUsers} from "../controllers/user.controllers.js";

const router = express.Router();    

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getSingleUser/:id", getSingleUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteAllUsers", deleteAllUsers);

export default router;
