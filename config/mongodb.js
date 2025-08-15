import mongoose from "mongoose";


const connectdb= async ()=>{
   try{
    await mongoose.connect(process.env.mongourl)
    console.log("Database connected.")
}catch(error){
    console.error("mongodb connection failed",error.message)
    process.exit(1)
}
}

export default connectdb