import Product from "../models/productModel.js";
import Users from "../models/userModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, image, description, price, countInStock } =
      req.body;

    const product = await Product.create({
      name,
      category,
      image,
      description,
      price,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400).json({ message: "Product Not Created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, category, image, description, price, countinStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.category = category;
      product.image = image;
      product.description = description;
      product.price = price;
      product.countinStock = countinStock;
    } else {
      res.status(404).json({ message: "Product Not found" });
    }

    const updatedProduct = await product.save();

    if (updatedProduct) {
      res.status(201).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    let user = await Users.findById(userId).populate('cart.product').populate('wishlist.product');

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product.id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((pro) =>
          pro.product._id.equals(product._id)
        );

        producttt.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }

    user = await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    let user = await Users.findById(userId)
    .populate('cart.product').populate('wishlist.product');

    if (user.wishlist.length == 0) {
      user.wishlist.push({ product });
    } else {
      isProductFound = false;
      for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].product._id.equals(product.id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        res.status(400).json({message: "Already added"})
      } else {
        user.wishlist.push({ product });
      }
    }

    user = await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    let user = await Users.findById(userId)
    .populate('cart.product').populate('wishlist.product');


    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product.id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1)
          
        }else{
          user.cart[i].quantity -= 1;
        }
      }
    }

    user = await user.save();
    res.json(user)
  } catch (error) {
    res.status(500).json(error)
  }

}



export const deleteCartItem = async (req, res) => {
  try {
    const { userId, index } = req.body;
    let user = await Users.findById(userId)
    .populate('cart.product').populate('wishlist.product');

    user.cart.splice(index, 1)
    user = await user.save();
    res.json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}




















































// export const removeCartItem = async (req, res) => {
//   try {
//     const { userId,id } = req.params;
//     const product = await Product.findById(id);
//     let user = await Users.findById(userId)
//       .populate("cart.product")
//       .populate("wishlist.product");

//     for (let i = 0; i < user.cart.length; i++) {
//       if (user.cart[i].product._id.equals(product._id)) {
//         if (user.cart[i].quantity == 1) {
//           user.cart.splice(i, 1);
//         } else {
//           user.cart[i].quantity -= 1;
//         }
//       }
//     }
//     user = await user.save();
//     res.json(user);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };


// export const deleteCartItem = async (req, res) => {
//   try {
//     const { userId,index } = req.body;
//     let user = await Users.findById(userId)
//       .populate("cart.product")
//       .populate("wishlist.product");

   
//     user.cart.splice(index, 1);
    
//     user = await user.save();
//     res.json(user);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };