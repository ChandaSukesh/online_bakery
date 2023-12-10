const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: [true, "Item type is required"],
    enum: ["Cake", "Cookies", "Muffins"],
  },
  orderState: {
    type: String,
    required: [true, "Order State is required"],
    enum: ["Created", "Shipped", "Delivered", "Cancelled"],
  },
  branchId: {
    type: Number,
    required: [true, "Branch Id is required"],
  },
  lastUpdatedTIme: {
    type: Date,
    required: false,
  },
  customerId: {
    type: Number,
    required: [true, "customer id is required"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
