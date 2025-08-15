import User from "../model/user.schema.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const loggedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        address: user.address
    }
    const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
    );
    res.status(200).cookie("token", token, { httpOnly: true }).json({
        message: "User logged in successfully",
        data: loggedUser,
    });
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }


    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const registeredUser = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePicture: newUser.profilePicture,
        address: newUser.address

    }
    const token = jwt.sign(
        { id: newUser._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
    );
    res.status(201).cookie("token", token, { httpOnly: true }).json({
        message: "User registered successfully",
        data: registeredUser
    });
}

const getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id).select("name email");
    res.status(200).json({
        message: "User fetched successfully",
        data: user
    })
}

const getAllUsers = async (req, res) => {
    const users = await User.find().select("name email");
    res.status(200).json({
        message: "Users fetched successfully",
        data: users
    })
}

const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('id', req.params.id);


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        password: hashedPassword || user.password
    });
    res.status(200).json({
        message: "User updated successfully",
        data: user
    })
}

const deleteAllUsers = async (req, res) => {
    await User.deleteMany();
    res.status(200).json({
        message: "All users deleted successfully"
    });
}

export { loginUser, registerUser, deleteAllUsers, getSingleUser, getAllUsers, updateUser }
