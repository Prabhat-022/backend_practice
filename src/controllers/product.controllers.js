
import Product from "../model/product.schema.js"
import { productData } from "../Data.js"
import Category from "../model/category.schema.js"

const getProduct = async (req, res) => {
    const products = await Product.find().select("title price description").limit(5) //select only title and price

    res.status(200).json({
        message: "Products fetched successfully",
        data: products
    })

}

const createProduct = async (req, res) => {
    const { id } = req.user;

    console.log("userId", id);
    const { title, price, description, category, stock, image } = req.body;

    if (!title || !price || !description || !category || !stock || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const product = new Product({ title, price, description, category, stock, image, userId: id });
    const categories = await Category.findOne({ name: category });
    if (!categories) {
        return res.status(400).json({ message: "Category not found" });
    }
    product.category = categories._id;

    await product.save();
    res.status(201).json({
        message: "Product created successfully",
        data: product
    })
}


const InsertAlltheproduct = async (req, res) => {
    const products = productData.map((product) => ({
        ...product,
        color: "red"
    }));
    const result = await Product.insertMany(products);
    res.status(201).json({
        message: "Products created successfully",
        data: result
    })
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        message: "Product fetched successfully",
        data: product
    })
}

const deleteProduct = async (req, res) => {
    const { id } = req.user;
    const productId = req.params.id;

    if (!id || !productId) {
        return res.status(400).json({ message: "User id or product id is required" });
    }

    const product = await Product.findByIdAndDelete({ _id: productId, userId: id });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({
        message: "Product deleted successfully",
        data: product
    })
}

export { getProduct, createProduct, InsertAlltheproduct, getSingleProduct, deleteProduct }

