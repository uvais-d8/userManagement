import  express  from "express";
import { protect } from "../middleware/authMiddileware.js";
import { login, registerUser ,updateProfile,getProfile} from "../controllers/UserController.js";
import { upload } from "../config/multer.js";

const router=express.Router()
router.post("/signup",registerUser)
router.post("/login",login)
router.get("/profile",protect,getProfile)
router.patch("/updateProfile",protect,upload.single("profileImage"),updateProfile)


export default router