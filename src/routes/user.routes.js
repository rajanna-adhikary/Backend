import {Router} from "express"
import {registerUser} from "../controllers/user.controller.js" //after choosing route controller sab handle karega and db se baat karega
import {upload} from "../middlewares/multermiddleware.js"
const router=Router()

//**1 ab user router m aa gaye /user hit karne k baad 
//url=https://localhost:8000/api/v1/users/register    aise hi login ke lie users/login basss idhr user ke baad wala chiz tackle ho raha ek file m nhi rakha humne clumsy ho jaata
router.route("/register").post( //uploas fields is a multer middleware 
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

//for  uploads















export default router