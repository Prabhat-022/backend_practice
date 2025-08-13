import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose"
import mongooseSchema from "mongoose"
import {productData} from "./Data.js"

dotenv.config();
console.log('port', process.env.PORT);


const app = express();
app.use(express.json());
app.use(morgan("dev"));



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const productSchema = new mongooseSchema.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
    image: String,
    rating: [
        {
            rate: Number,
            count: Number
        }
    ],
    color: String,
    createdAt: Date,
    updatedAt: Date
})

const userSchema = new mongooseSchema.Schema({
    name: String,
    email: String,
    password: String
})
const User = mongoose.model("User", userSchema)
const Product = mongoose.model("Product", productSchema)

//user routes 
app.post("/user", (req, res) => {
    const user = new User(req.body);
    user.save();
    res.status(201).json({
        message: "User created successfully",
        data: user
    })
});

app.get("/user", (req, res) => {
    const users = User.find();
    res.status(200).json({
        message: "Users fetched successfully",
        data: users
    })
});

app.get("/user/:id", (req, res) => {
    const user = User.findById(req.params.id);
    res.status(200).json({
        message: "User fetched successfully",
        data: user
    })
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/getProducts", async (req, res) => {
    const products = await Product.find().select("title price description").limit(5) //select only title and price

    res.status(200).json({
        message: "Products fetched successfully",
        data: products
    })

});


app.post("/product", async (req, res) => {
    const { title, price, description, category, stock, image } = req.body;
    const product = new Product({ title, price, description, category, stock, image });
    await product.save();
    res.status(201).json({
        message: "Product created successfully",
        data: product
    })
});

app.post("/products", async (req, res) => {
    const products = productData.map((product) => ({
        ...product,
        color: "red"
    }));
    const result = await Product.insertMany(products);
    res.status(201).json({
        message: "Products created successfully",
        data: result
    })
});





app.get("/product/:id", (req, res) => {
    const product = Product.findById(req.params.id);
    res.status(200).json({
        message: "Product fetched successfully",
        data: product
    })
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
    connectDB();

});