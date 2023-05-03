import express from 'express'
import connectDB from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'


dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use('/api/users',userRoutes)



const port = process.env.PORT || 5000
app.listen(port,
    console.log(`Serevr is running on port ${port}`)
)
