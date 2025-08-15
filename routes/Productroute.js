
import upload from "../Middleware/Multer.js"
import express from "express"
import {removeproduct,uploadProduct,getproducts,singleproduct} from "../controler/Productcontroler.js"
const productroute=express.Router();

productroute.post(
  "/upload",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
  ]),
  uploadProduct
);
productroute.post("/remove",removeproduct)
productroute.get("/get",getproducts)
productroute.post("/single",singleproduct)


export default productroute