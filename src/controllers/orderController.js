const Order = require("../models/orderSchema");

const orderData = async (req, res, next) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  //if email not exisitng in db then create: else: InsertMany()

  let eId = await Order.findOne({ email: req.body.email });

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
};
const myOrderData = async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Error", error.message);
  }
};
module.exports = { orderData, myOrderData };
