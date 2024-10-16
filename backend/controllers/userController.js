const validator  =require('validator');
const userModel =require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken')



const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//route for user login
const loginUser=async (req,res)=>{

    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exists"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){

            const token=createToken(user._id)
            res.json({success:true,token})

        }
        else{
            res.json({success:false,message:"invalide credentials"})
        }

    }
    catch(error){

        console.log(error);
        res.json({success:false,message:error.message})



    }

}

//const for user register
 const registerUser=async (req,res)=>{

    try{
        const {name,email,password}=req.body;
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.lenght<8){
            return res.json({success:false,message:"please enter a strong password"})
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token=createToken(user._id)
        res.json({success:true,token})



    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})

    }

 }

 //route for admin 


 const adminLogin = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     // Check if email and password match the admin credentials in the environment variables
     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
       // Create a JWT token with the email and password
       const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
       // Send success response with the token
       res.json({ success: true, token });
     } else {
       // Invalid credentials
       res.json({ success: false, message: "Invalid email & password" });
     }
   } catch (error) {
     // Handle server error
     return res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 };
 
 

  module.exports = {
    loginUser,
    registerUser,
    adminLogin,
};