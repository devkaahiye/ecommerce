import mongoose from 'mongoose'

const connectDB = ()=>{
    mongoose.connect(process.env.MONG_URL)
    .then(()=> {
        console.log('Database Connected')
    })
}
export default connectDB