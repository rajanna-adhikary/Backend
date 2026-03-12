import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser= asyncHandler(async(req,res)=>{
    //WE WILL TAKE REFERNCE FROM USER MODEL
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
     const {fullName, email, username, password } = req.body
    console.log("email: ", email);

    
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // console.log(req.files);
    // console.log(existedUser)
    // console.log(req.body)
     const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path; cause iagar user cover imge nhi de raha toh error throw kar raha hai isiliye neeche wala if else lagaya hai

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })//db

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )//weird suntax

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

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