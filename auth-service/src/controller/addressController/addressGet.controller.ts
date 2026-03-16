import { getAddressService } from "../../service/address/addressGet.service.js";
import type { Request, Response } from "express";

export async function GetAddressContrroller(
    req: Request,
    res: Response
){
    try{


        if(!req.user){
            return res.status(401).json({
                error:"Unauthorized"
            })
        }

        const user_id = req.user.id

        // validar id
        if(!user_id || typeof user_id !== "number"){
            return res.status(400).json({
                error:"Invalid user id"
            })
        }

        const dados = await getAddressService(user_id)


        if(!dados){
            return res.status(404).json({
                error:"Addresses not found"
            })
        }

   
        if(Array.isArray(dados) && dados.length === 0){
            return res.status(200).json({
                message:"No addresses found",
                data:[]
            })
        }

        return res.status(200).json({
            data:dados
        })

    }catch(error){

        console.error("GetAddressController error:", error)

        return res.status(500).json({
            error:"Internal server error"
        })

    }
}