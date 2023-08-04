import Orders from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Users from "../models/userModel.js";


export const getAllOrders = async (req, res)=> {

    try {
        const orders = await Orders.find().populate("products.product");

        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }




}

export const getRecentOrders = async (req, res)=> {

    try {
        const orders = await Orders.find().populate("products.product");

        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }




}

export const addOrderItems = async (req, res) => {

    try {
        const  { userid, productsList, address,deliveryPrice,totalPrice, paymentMethod } = req.body;
        
        let products = [];

        for (let index = 0; index < productsList.length; index++) {

            let product = await Product.findById(productsList[index].product._id);
            if (product) {
                if (product.countInStock >= productsList[index].quantity) {
                    product.countInStock -= productsList[index].quantity
                    products.push(
                        {
                            product:product,
                            quantity:productsList[index].quantity
                        }
                    )

                    await product.save();
                    
                }else{
                    res.json({message: 'out of stock'})
                }
            }
            
        }

        let user = await Users.findById(userid)
        if (user) {
            user.cart = []

            user = await user.save()
        }


        let order = new Orders(
            {
                user:userid,
                products,
                address,
                paymentMethod,
                deliveryPrice,
                totalPrice,
                status:0,
                orderedAt: new Date().getTime()
            }
        )


        order = await order.save()


        res.json(order)


    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }

}