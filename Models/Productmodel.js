import mongoose from "mongoose"


const House= new mongoose.Schema({
	name:{type:String,required:true},
	desc:{type:String,required:true},
	category:{type:String,required:true},
	price:{type:String,required:true},
	taken:{type:Boolean,required:true},
	images:{type:Array,required:true}
})


const productmodel= mongoose.model.Product || mongoose.model("Product",House)

export default productmodel