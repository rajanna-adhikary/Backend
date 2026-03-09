import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//eg form bhara data lia
app.use(express.json({limit:"16kb"}))

//url wale time lena hai toh---(kahi lahi space ka url encoded hota %20,+ etc etc woh sab bhi handle karna padhta hai)
app.use(express.urlencoded({extended:true,limit:"16kb"}))

//images aayi toh mai mere server m store rakhna chahti
app.use(express.static("public"))

app.use(cookieParser())






export {app}
