import express from "express"
import productroute from "./routes/Productroute.js"
import userRoute from "./routes/Userroute.js"
import connectdb from "./config/mongodb.js"
import "dotenv/config"
import cors from "cors";
const port = process.env.PORT || 3500

const app=express()

app.use(express.json())



app.use(cors({
  origin: "https://area1-u88j.vercel.app",
  credentials: true
}));
app.use('/products',productroute)
app.use('/user',userRoute)
connectdb()


app.get('/',(req,res)=>{
  res.send("api running")
}
)

app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})