import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderDeliveryDate: {
        type: Date,
        default: () => {
          const today = new Date();
          today.setDate(today.getDate() + 10); // add 10 days
          return today;
        }
      },
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    products: [orderProductSchema]
})

const Order = mongoose.model("Order", orderSchema)

export default Order
