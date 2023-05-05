import express from 'express'
import { getUserProfile, login, register } from '../controllers/userControllers.js'

const router = express.Router()


router.route('/').post(register)
router.route('/:id').get(getUserProfile)
router.route('/login').post(login)

export default router