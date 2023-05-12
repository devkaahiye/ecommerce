import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, image, description, price, countInStock } =
      req.body;

      let product = new Product({
      name,
      category,
      image,
      description,
      price,
      countInStock,
    });

    product = await product.save();

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(500).json({ message: "Product Not Created" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

export const updateProduct = async (req, res) => {
  const { name, category, image, description, price, countinStock } = req.body;

  const product = await Product.findById(req.parmas.id);

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
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.parmas.id);
  if (product) {
    res.status(200).json({ message: "Product deleted" });
  }
};
