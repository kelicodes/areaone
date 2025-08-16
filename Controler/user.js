import userModel from "../Models/Usermodel.js"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

export const Userregistration=async(req,res)=>{
	const {name,email,password}=req.body;
	if(!email || !name || !password ){
		return res.json({success:false, message: "all fileds are required"})
	}
	try{
		const existingmail=await userModel.findOne({email})
		if(existingmail){
			return res.json({success:false,message:"user with email already exists"})
		}
		const salt=await bcrypt.genSalt(10)
		const hashedpassword=await bcrypt.hash(password,salt)
		const user=new userModel({
			name:req.body.name,
			password:hashedpassword,
			email:req.body.email
		})
		await user.save()
		return res.json({success:true})
	}catch(error){
		console.log(error.message)
		return res.json({success:false, message:"error in userRegistration "})
	}
}
export const Login=async(req,res)=>{
	const {email,password}=req.body;
	if(!email || !password){
		return res.json({success:false,message:"all fileds are required"})
	}
	try{
		const user=await userModel.findOne({email})
		if(user){
			const pwordcompare=await bcrypt.compare(req.body.password,user.password)
			if(!pwordcompare){
				return res.json({success:false,message:"Incorrect password"})
			}
			const token=JWT.sign({id:user._id}, process.env.secretkey)

			res.cookie("token", token)
			return res.json({success:true,message:"log in successfull",token, role:"user"})
		}
	}catch(error){
		return res.json({success:false,message:"error in login controller"})
	}
}

export const Logout=async(req,res)=>{
	try{
		res.clearCookie("token")
		return res.json({success:true,message:"logged out successfully"})
	}catch(error){
		res.json({success:false,message:"error in logout controller"})
	}
}

export const adminlogin=async(req,res)=>{
	try{
		const {email,password}=req.body;
		if(!email || !password){
			return res.json({success:false,message:"Both email and password are required"})
		}
		if(email === process.env.ADMINMAIL && password === process.env.ADMINPWORD){
			const token=JWT.sign(email+password,process.env.MYSEC)
			return res.json({success:true,token,message:"admin loged in", role:"admin"})
		}else{
			return res.json({success:false,message:"Invalid credentials"})
		}
	}catch(error){
		console.log(error.message)
		return res.json({success:false,message:"error in admin login"})
	}
}

