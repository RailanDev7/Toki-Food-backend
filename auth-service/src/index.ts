import express from 'express';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './docs/swagger.js';
import auth from './routes/auth/auth.routes.js';
import addressRouter from './routes/address/addres.routes.js';
import profileRouter from './routes/profile/profile.routes.js';
import emailCodeRouter from './routes/emailCode/emailCode.routes.js';
import userCpfRouter from './routes/userCpf/userCpf.routes.js';
import userRouter from './routes/user/user.routes.js';


const app = express();
app.use(express.json());



//Ok message
app.get("/", (req, res) => {
   return res.json({ message: "OK" });
});

//docs swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//api v1 routers
app.use("/api/v1", auth);
app.use("/api/v1", addressRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", emailCodeRouter);
app.use("/api/v1", userCpfRouter);
app.use("/api/v1", userRouter);

export default app;
