const express = require("express");
const orderController = express.Router();
const Order = require("../models/orders");

//create an order
orderController.post("/", async (req, res) => {
  try {
    const body = req?.body;
    const newBody = { ...body, lastUpdatedTIme: new Date() };
    const order = new Order(newBody);
    const savedOrder = await order.save();
    res
      .status(201)
      .json({ success: true, message: "created", id: savedOrder?._id });
  } catch (err) {
    res.status(417).json({ success: false, error: err });
  }
});

//get orders by criteria
//if you want to want to get all orders dont pass any
orderController.get("/", async (req, res) => {
  try {
    const { itemType, orderState, region, startDate, endDate } = req?.query;
    let filter = {};
    if (itemType) {
      filter.itemType = itemType;
    }
    if (orderState) {
      filter.orderState = orderState;
    }
    if (region) {
      filter.branchId = region;
    }
    if (startDate) {
      if (!endDate) {
        endDate = new Date();
      }
      filter.lastUpdatedTIme = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    const orders = await Order.find(filter);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

//get order details by id
orderController.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req?.params?.id);
    res.status(200).send(order);
  } catch (err) {
    res.status(404).json({ success: false, error: err });
  }
});

module.exports = orderController;
