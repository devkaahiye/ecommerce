import express from 'express'
import connectDB from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import dotenv from 'dotenv'


dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/orders',orderRoutes)

 

const port = process.env.PORT || 5000
app.listen(port,()=> {
    console.log(`Serevr is running on port ${port}`)
})
