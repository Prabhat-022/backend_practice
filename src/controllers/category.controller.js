
import Category from "../model/category.schema.js";


const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const category = await Category.create({ name });
    res.status(201).json({
        message: "Category created successfully",
        data: category
    })
}

export { createCategory }
