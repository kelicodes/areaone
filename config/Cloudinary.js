
import dotenv from "dotenv"
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
dotenv.config()


cloudinary.config({
	cloud_name:process.env.cloudname,
	api_key:process.env.cloudkey,
	api_secret:process.env.cloudsecret,
})

export default cloudinary