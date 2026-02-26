import express from 'express';
import prisma from './utils/prisma.Client.js';



const app = express();
app.use(express.json())


app.get("/", async(req, res) => {
    try {
     const dados = await prisma.teste.findMany();
        return res.json(dados)
    } catch (error) {
        console.log(error)
    }
    
})



export default app

