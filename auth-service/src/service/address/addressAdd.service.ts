import { prisma } from "../../utils/prismaClient.js";
import { validateAddressData } from "../../utils/validator/addressValidator/addressAddVallidator.js";
import "dotenv/config";

export async function addressService(
 data: unknown,
 user_id:number
){

 if(typeof user_id !== "number" || !user_id){
    throw new Error("Unauthorized")
 }

 try{
    const validation = validateAddressData(data);

    if(!validation.success){
        return {
            error:true,
            message:"Invalid address data",
            details:validation.error.flatten()
        };
    }

    const addressData = {
        cep: validation.data.cep,
        rua: validation.data.rua,
        numero: validation.data.numero ?? null,
        bairro: validation.data.bairro,
        cidade: validation.data.cidade,
        estado: validation.data.estado,
        complemento: validation.data.complemento ?? null,
        latitude: validation.data.latitude,
        longitude: validation.data.longitude,
        user_id: user_id
    };


    // TRANSACTION evita race condition
    return await prisma.$transaction(async (tx)=>{

        const addressCount = await tx.address.count({
            where:{
                user_id:user_id
            }
        });

        console.log("Current address count for user:", addressCount);

        if(addressCount >= 5){
            return {
                error:true,
                message:"Address limit reached"
            };
        }

        const existingAddress = await tx.address.findFirst({
            where:{
                user_id:user_id,
                cep:addressData.cep,
                rua:addressData.rua,
                numero:addressData.numero ?? null,
                bairro:addressData.bairro,
                cidade:addressData.cidade,
                estado:addressData.estado
            }
        });

        if(existingAddress){
            return {
                error:true,
                message:"Address already exists"
            };
        }

        await tx.address.create({
            data:addressData
        });

        return {
            success:true,
            message:"Address created"
        };

    });

 }catch(error){

    throw new Error("Database error");

 }

}
