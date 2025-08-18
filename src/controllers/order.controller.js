import Cart from "../model/cart.shcema.js";
import Order from "../model/order.schema.js";

export const createOrder = async (req, res) => {
    try {
        const { address } = req.body;
        const { id } = req.user;

        console.log("address", address);
        console.log("id", id);

        if (!address || !id) {
            return res.status(400).json({ message: "User id is required" });
        }

        let cart = await Cart.findOne({ userId: id });
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }

        const order = await Order.create({ userId: id, products: cart.products, address });
        await cart.deleteOne();

        res.status(200).json({
            message: "Order created successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.user;
        const order = await Order.findOneAndDelete({ userId: id });
        res.status(200).json({
            message: "Order deleted successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}