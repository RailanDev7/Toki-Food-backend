import { Router } from "express";
import { registerController } from "../../controller/auth/register.controller.js";
import { loginController } from "../../controller/auth/login.controller.js";



const router = Router();


router.post('/register', registerController)
router.post('/login', loginController)


export default router