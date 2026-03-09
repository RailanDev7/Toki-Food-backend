import { createAddressController } from "../../controller/addressController/address.controller.js";
import { Router } from "express";



const addressRouter = Router();


addressRouter.post('/address', createAddressController);


export default addressRouter;




