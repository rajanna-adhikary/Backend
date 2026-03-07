import dotenv from "dotenv"
//import mongoose from "mongoose"
//kabhi bhi db ek line m connect nhi karna chahiye
//import {DB_NAME} from "./constants";

import connectDB from "./db/index.js"
/*
import express from "express";
const app=express()
(async()=>{
    try{
           await  mongoose.connection(`${process.env.MONGODB_URI}/${DB_NAME}`  )
            //db run but express baat nhi kar paa raha hai
            app.on("error",(error)=>{
                console.log("ERR:",error)
                throw error
            })
            app.listen(process.env.PORT,()=>{
                console.log(`app is listening on ${process.env.PORT}`)
            })
    }
    
    catch(error){
        console.error("ERROR",error)
        throw error
    }
})()  */
//UPER WALA WAS ONE OF THE APPROACH

dotenv.config({
    path: "./.env"
})

connectDB()