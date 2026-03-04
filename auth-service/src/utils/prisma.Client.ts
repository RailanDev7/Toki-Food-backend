import { PrismaClient } from "@prisma/client";


 const prisma = new PrismaClient()
 export default prisma

 const user = await prisma.usuario.create({
    data: {
        name: "Railan",
        email:"Railan@gmail.com"
    }
 })