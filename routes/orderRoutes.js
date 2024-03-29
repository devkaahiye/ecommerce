import express from 'express'
import { addOrderItems, getAllOrders, getMyOrders, getRecentOrders } from '../controllers/orderController.js'

const router = express.Router()


router.route('/').post(addOrderItems).get(getAllOrders)
router.route('/recent').get(getRecentOrders)
router.route('/myOrders/:id').get(getMyOrders)

export default router