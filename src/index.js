import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js"
import productRoutes from "./routes/product.routes.js"
import userRoutes from "./routes/user.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"
dotenv.config();

connectDB();


const app = express();
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
    res.send("Hello World!");
});

//product routes
app.use("/api/v1", productRoutes);

//user routes
app.use("/api/v1", userRoutes);

//category routes
app.use("/api/v1", categoryRoutes);

//cart routes
app.use("/api/v1", cartRoutes); 

//order routes
app.use("/api/v1", orderRoutes); 

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
});