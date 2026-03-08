import express from 'express';
import router from './routes/auth/authRouter.js';


const app = express();
app.use(express.json())



//Ok message
app.get("/", (req, res) => {
   return res.json({ message: "OK" })
})


//api v1 routers
app.use("/api/v1", router)



export default app

