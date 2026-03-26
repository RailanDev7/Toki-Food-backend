import { Router } from "express";
import { sendEmailCodeController } from "../../controller/emailCode/sendEmailCode.controller.js";
import { verifyEmailCodeController } from "../../controller/emailCode/verifyEmailCode.controller.js";
import { checkVerificationStatusController } from "../../controller/emailCode/checkVerificationStatus.controller.js";
import { authMiddleware } from "../../middleware/jwt/jsonwebtoken.midle.js";

const emailCodeRouter = Router();

/**
 * @swagger
 * /email/send-code:
 *   post:
 *     summary: Enviar código de verificação de email
 *     tags:
 *       - Email Verification
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Código enviado
 *       400:
 *         description: Erro ao enviar código
 */
emailCodeRouter.post("/email/send-code", authMiddleware, sendEmailCodeController);

/**
 * @swagger
 * /email/verify:
 *   post:
 *     summary: Verificar código de email
 *     tags:
 *       - Email Verification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: ABC123
 *     responses:
 *       200:
 *         description: Email verificado
 *       400:
 *         description: Código inválido ou expirado
 */
emailCodeRouter.post("/email/verify", authMiddleware, verifyEmailCodeController);

/**
 * @swagger
 * /email/status:
 *   get:
 *     summary: Verificar status de verificação do email
 *     tags:
 *       - Email Verification
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status da verificação
 */
emailCodeRouter.get("/email/status", authMiddleware, checkVerificationStatusController);

export default emailCodeRouter;
