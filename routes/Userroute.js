
import express from "express"
import {Login,Logout,Userregistration,adminlogin} from "../Controler/user.js"
const userRoute=express.Router()

userRoute.post("/register", Userregistration)
userRoute.post('/login',Login)
userRoute.post('/logout',Logout)
userRoute.post('/adminlogin',adminlogin)

export default(userRoute)