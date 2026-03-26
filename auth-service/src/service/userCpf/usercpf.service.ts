import { prisma } from "../../utils/prismaClient.js";
import { validacpfData } from "../../utils/validator/usercpf/userValidator.js";

export async function userData(
    data: unknown,
    user_id: number
) {

    try {
        
        const validation = await validacpfData(data)
        if (!validation.success) {
            return {
                error: true,
                message: "Invalid data",
                details: validation.error.flatten()
            };
        }
        const userData = {
            cpf: validation.data.cpf,
            data_nasci: validation.data.data_nasci
        }
        const existDataUser = await prisma.userCPF.findUnique({
    where:{ user_id }
})

if(!existDataUser){

    await prisma.userCPF.create({
        data:{
            cpf: userData.cpf,
            data_nasci: userData.data_nasci,
            user_id
        }
    })

}

    } catch (error) {
        console.error(error)
        return { error:true }
    }

}