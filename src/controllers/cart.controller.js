
import Cart from "../model/cart.shcema.js";
import Product from "../model/product.schema.js";

const addItemInCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const { id } = req.user;

        if (!productId || !id) {
            return res.status(400).json({ message: "Product id or user id is required" });
        }

        let cart = await Cart.findOne({ userId: id });
        if (!cart) {
            cart = await Cart.create({ userId: id, products: [{ productId, quantity: 1 }] });
        } else {
            const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }
            cart = await cart.save();
        }

        res.status(200).json({
            message: "Product added to cart successfully",
            data: cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const { id } = req.user;

        let cart = await Cart.findOne({ userId: id });
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        } else {
            const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            if (productIndex !== -1 && cart.products[productIndex].quantity > 0) {
                cart.products[productIndex].quantity--;
            } else {
                cart.products = cart.products.filter(item => item.productId.toString() !== productId);
            }
            cart = await cart.save();
        }
        res.status(200).json({
            message: "Product removed from cart successfully",
            data: cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export { addItemInCart, removeItemFromCart }