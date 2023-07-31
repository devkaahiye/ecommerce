import mongoose from 'mongoose'


const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
        
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                required:true 
            }
        }
    ],
    address:{
        type:String,
        required:true
    },
    deliveryPrice:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true,
        default:0,
    },
    orderedAt:{
        type:Number,
        required:true,
    },
    paidAt:{
        type:Number,
        
    },
    deliveredAt:{
        type:Number,
        
    },
    
    

    
})

const Orders = mongoose.model("orders", orderSchema)

export default Orders