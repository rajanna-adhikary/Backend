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



//here we are going to import all the routes , not in index.js
//and also after doing all the shit with middlewares we are importing here(imp)
//so we will be using app.use (middleware act kar raha na router) ab kaha direct server m hi sab likh dia so no app.get
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter) //jab user /user hit karega tabh hu userRouter m jaenge...**1
//i.e url now= https://localhost:8000/api/v1/users (now go to route)





export {app}
