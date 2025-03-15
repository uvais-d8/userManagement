import { getUsers,createUser ,updateUser,deleteUser} from "../controllers/adminController.js";

import  express from "express";

const router=express()
router.get('/users',getUsers)
router.post("/createUser",createUser)
router.patch('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)


export default router