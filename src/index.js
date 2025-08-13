import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
console.log('port', process.env.PORT);


const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

let products =[
    {
        "id":1,
        "name":"product",
        "price":100,
        "description":"product description"
    },
    {
        "id":2,
        "name":"product",
        "price":100,
        "description":"product description"
    },
    {
        "id":3,
        "name":"product",
        "price":100,
        "description":"product description"
    }
]

app.get("/product", (req, res) => {
    res.send(products);
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
});