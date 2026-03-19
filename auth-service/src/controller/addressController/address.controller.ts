import type { Request, Response } from "express";
import { addressService } from "../../service/address/addressAdd.service.js";
import "dotenv/config";

export async function createAddressController(
 req: Request,
 res: Response
){

 try{

    if(!req.user?.id){
        return res.status(401).json({
            error:true,
            message:"Unauthorized - No user id in token"
        })
    }

    const user_id:number = req.user.id
    

    const result = await addressService(
        req.body,
        user_id
    )

    if(result?.error){
        return res.status(400).json(result)
    }

    return res.status(201).json(result)

 }catch(error){

    console.error(error)

    return res.status(500).json({
        error:true,
        message:"Internal server error"
    })

 }

}