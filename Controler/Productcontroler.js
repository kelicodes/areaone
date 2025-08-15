import productmodel from "../Models/Productmodel.js"
import upload from "../config/Cloudinary.js"
// Use this instead of the named import
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;


export const uploadProduct=async(req,res)=>{
	try{
	const {name,price,category,taken,desc}=req.body;
		const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];


		const images = [image1,image2,image3].filter(
			(item)=> item !== undefined
		)

		const imagesurl= await Promise.all(
			images.map(async(item)=>{
				let results= await cloudinary.uploader.upload(item.path,{
					resource_type:'image'
				});
				return results.secure_url
			}))

		const myproduct={
			name,
			price,
			images:imagesurl,
			category,
			taken,
			desc
		}
		const theproduct= new productmodel(myproduct)
		await theproduct.save()

		return res.json({success:true,message:"product added"})
		
			}catch(error){
				console.error("Upload error:", error.message);
				return res.json({success:false,message:"error in upload product"})
	}
} 


export const getproducts=async(req,res)=>{
	try{
		const allproducts=await productmodel.find({})
		res.json({success:true,message:"products fetched",allproducts})
	}catch(error){
		console.error("get:", error.message);
		return res.json({success:false,message:"error in get product controller"})
	}
}

export const removeproduct=async(req,res)=>{
	try{
		await productmodel.findByIdAndDelete(req.body.id)
		return res.json({success:true,message:"found by id and delete"})
	}catch(error){
		return res.json({success:false,message:"error in remove product controller"})
	}
}


export const singleproduct=async(req,res)=>{
	const {productid}=req.body
	try{
		const product=await productmodel.findById(productid)
		return res.json({success:true,message:"product fetched successfully",product})
	}catch(error){
		console.error("single", error.message);
		return res.json({success:false,message:"error in singleproduct"})
	}
}