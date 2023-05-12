import Product from "../models/productModel.js";


export const createProduct = async(req, res) =>{
    const {name, category, image, description, price, countInStock} = req.body;

    const product = await Product.create(
        {
            name, category, image, description, price, countInStock
        }
    );

    if (product) {
        res.statusCode(201).json(product)
        
    }
    else{
        res.statusCode(500).json({message: 'Product Not Created'})
    }

}

export const updateProduct =async (req, res)  => {
    const {name, category, image, description, price, countinStock} = req.body;

    const product = await Product.findById(req.parmas.id)

    if (product) {
        product.name =name
        product.category =category
        product.image =image
        product.description =description
        product.price =price
        product.countinStock =countinStock
        
    }
    else{
        res.statusCode(404).json({message: 'Product Not found'})
    }

    const updatedProduct = await product.save();

    if (updatedProduct) {
        res.statusCode(201).json(updatedProduct)
        
    }
    


}



export const deleteProduct = async (req, res)=>{

    const product = await Product.findByIdAndDelete(req.parmas.id)
    if (product) {
        res.statusCode(200).json({message:'Product deleted'})
        
    }
}