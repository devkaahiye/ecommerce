import Orders from "../models/orderModel";
import Product from "../models/productModel";
import Users from "../models/userModel";

export const addOrderItems = async (req, res) => {
  try {
    const {
      userid,
      products,
      address,
      paymentMethod,
      shippingPrice,
      totalPrice,
    } = req.body;

    let productslist = [];

    for (let i = 0; i < productslist.length; i++) {
      let product = await Product.findById(productslist[i].product._id);
      if (product) {
        if (product.countInStock >= productslist[i].quantity) {
          product.countInStock -= productslist[i].quantity;
          productslist.push({
            product,
            quantity: productslist[i].quantity,
          });
          await product.save();
        } else {
          return res
            .status(400)
            .json({ msg: `${product.name} is out of stock!` });
        }
      }
    }
    let order = new Orders({
      products,
      user: userid,
      address,
      paymentMethod,
      shippingPrice,
      totalPrice,
      status: 0,
      orderedAt: new Date().getTime(),
    });
    order = await order.save();
    if (order) {
      let user = await Users.findById(userid);
      user.cart = [];
      user = await user.save();
    }
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
