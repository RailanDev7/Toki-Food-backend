import express from 'express';
import router from './routes/authRouter.js';


const app = express();
app.use(express.json())

//api v1 routers
app.use("/api/v1", router)


app.get("/", (req, res) => {
   return res.json({ message: "OK" })
})



export default app

