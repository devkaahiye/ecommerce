import express from 'express'
import { addToCart, addToWishlist, createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js'

const router = express.Router()


router.route('/').post(createProduct).get(getProducts)
router.route('/:id').put(updateProduct).delete(deleteProduct)
router.route('/addToCart').post(addToCart)
router.route('/addToWishlist').post(addToWishlist)

export default router