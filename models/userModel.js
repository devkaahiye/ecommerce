import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    cart:[
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
    wishlist:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
        }
    ]
    

 
    
    
})

const Users = mongoose.model("users", userSchema)

export default Users