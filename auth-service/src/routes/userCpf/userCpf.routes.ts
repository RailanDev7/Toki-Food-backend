import { Router } from "express";
import { userCpfController } from "../../controller/userCpf/userCpf.controller.js";
import { getUserCpfController } from "../../controller/userCpf/getUserCpf.controller.js";
import { authMiddleware } from "../../middleware/jwt/jsonwebtoken.midle.js";

const userCpfRouter = Router();

/**
 * @swagger
 * /user/cpf:
 *   post:
 *     summary: Criar dados de CPF do usuário
 *     tags:
 *       - User CPF
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - data_nasci
 *             properties:
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               data_nasci:
 *                 type: string
 *                 example: "1990-01-15"
 *     responses:
 *       201:
 *         description: CPF criado
 *       400:
 *         description: Erro ao criar CPF
 */
userCpfRouter.post("/user/cpf", authMiddleware, userCpfController);

/**
 * @swagger
 * /user/cpf:
 *   get:
 *     summary: Buscar dados de CPF do usuário
 *     tags:
 *       - User CPF
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CPF encontrado
 *       404:
 *         description: CPF não encontrado
 */
userCpfRouter.get("/user/cpf", authMiddleware, getUserCpfController);

export default userCpfRouter;
