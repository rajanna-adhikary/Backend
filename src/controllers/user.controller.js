import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser= asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })

})

export {registerUser}
// 🔟 Without asyncHandler

// You would need this everywhere:

// const registerUser = async (req,res,next) => {
//     try {
//         res.status(200).json({message:"ok"})
//     }
//     catch(err){
//         next(err)
//     }
// }

// In every controller.

// 11️⃣ With asyncHandler

// Cleaner:

// const registerUser = asyncHandler(async (req,res)=>{
//     res.status(200).json({message:"ok"})
// })

// No try/catch needed.