import express from 'express';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './docs/swagger.js';
import router from './routes/auth/authRouter.js';


const app = express();
app.use(express.json())



//Ok message
app.get("/", (req, res) => {
   return res.json({ message: "OK" })
})

//docs swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//api v1 routers
app.use("/api/v1", router)



export default app

