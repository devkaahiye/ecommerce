import Users from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


export const register = async(req, res)=>{
    const {name, email, password, address, phone}= req.body;

    const userExists =await Users.findOne({email})
    if (userExists) {
        res.status(400).json({message:'user already exists'})
    }
    else{ 
        const user = Users.create({
            name, email, password, address, phone
        })
    
        if (user) {
            res.status(201).json({
               _id: user._id,
               name: user.name,
               email: user.email,
               password: user.password,
               phone: user.phone,
               address: user.address,
               token:generateToken(user._id)
    
            })
    }
    else{
        res.status(401).json({message:'Invalid User Data'});
    }

    
        
    }
}


export const login =async(req, res)=>{
    const {email, password} = req.body;


    const user = await Users.findOne({email});

    if (user && password == user.password) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            phone:user.phone,
            address:user.address,
            token:generateToken(user._id)
 
         })
    }else{
        res.status(404).json({message:'Invalid Email or Password'});
    }
}


export const getUserProfile = async(req, res) =>{

    const {token} = req.body;

    const user = Users.findById(req.params.id);

    if (user) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            phone:user.phone,
            address:user.address,
            token
 
         })
    }else{
        res.status(404).json({message:'User not found'});
    }
        
    }







// Authentication
// Authorization