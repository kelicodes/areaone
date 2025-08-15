import JWT from "jsonwebtoken"


export const userAuth=async(req,res,next)=>{
	try{
		const token=req.cookie;
		if(!token){
			return res.json({
				success:"false",
				message:"not authorized login again"
			})
		}
		const decode=JWT.verify(token,process.enc.secretkey)
		if(decode.id){
			req.body.userid = decode.id  
		}else{
			return res.json({
				success:false,
				message:"token decode failed"})
		}
		next()
	}catch(error){
		return res.json({success:false,message:"error in middleware"})
	}
}