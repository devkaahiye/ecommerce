import express from 'express'
import { createProduct, deleteProduct, updateProduct } from '../controllers/productController.js'

const router = express.Router()


router.route('/').post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)

export default router