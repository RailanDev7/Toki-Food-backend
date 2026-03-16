import { prisma } from "../../utils/prismaClient.js";

export async function getAddressService(user_id: number){

    if(!user_id){
        throw new Error("User id is required")
    }

    try{

        const dados = await prisma.address.findMany({
            where:{
                user_id:user_id
            }
        })

        return dados

    }catch(error){

        console.error("getAddressService error:", error)

        throw new Error("Database error")

    }

}