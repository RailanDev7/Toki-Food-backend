import { prisma } from "../../utils/prismaClient.js"





async function deleteAddressService(user_id: number) {
    try {
        const dados = await prisma.address.findMany({
         where: {
            user_id: user_id
         }   
        })
        console.log(dados)
        return dados
    } catch (error) {
        console.log('error')
    }
    
}