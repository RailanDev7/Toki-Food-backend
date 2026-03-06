import express from 'express';
import {prisma} from './utils/prismaClient.js'


const app = express();
app.use(express.json())

app.post("/contas", async(req, res) => {
   try {
   const { name, email, password } = req.body
    await prisma.user.create({
      data: {
         name: name,
         email: email,
         password: password
      }
   })
   return res.json({ message: "conta criada com sucesso"})
   } catch (error) {
      console.log("erro ao criar conta", error)
   }
})

app.get("/", (req, res) => {
   return res.json({ message: "sucesso"})
})



export default app

