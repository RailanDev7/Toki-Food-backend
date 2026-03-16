import { createAddressController } from "../../controller/addressController/address.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../middleware/jwt/jsonwebtoken.midle.js";
import { GetAddressContrroller } from "../../controller/addressController/addressGet.controller.js";


const addressRouter = Router();


addressRouter.post('/address', authMiddleware, createAddressController);

addressRouter.get('/search', authMiddleware, GetAddressContrroller)
export default addressRouter;




