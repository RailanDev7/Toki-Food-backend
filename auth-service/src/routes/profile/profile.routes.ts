import { Router } from "express";
import { createProfileController } from "../../controller/profile/createProfile.controller.js";
import { getProfileController } from "../../controller/profile/getProfile.controller.js";
import { editProfileController } from "../../controller/profile/editProfile.controller.js";
import { authMiddleware } from "../../middleware/jwt/jsonwebtoken.midle.js";

const profileRouter = Router();

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Criar perfil do usuário
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *               bio:
 *                 type: string
 *                 example: Descrição do perfil
 *               genero:
 *                 type: string
 *                 enum: [sem_preferencia, femenino, masculino]
 *     responses:
 *       201:
 *         description: Perfil criado
 *       400:
 *         description: Erro na criação do perfil
 */
profileRouter.post("/profile", authMiddleware, createProfileController);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Buscar perfil do usuário
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *       404:
 *         description: Perfil não encontrado
 */
profileRouter.get("/profile", authMiddleware, getProfileController);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Editar perfil do usuário
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *               bio:
 *                 type: string
 *               genero:
 *                 type: string
 *                 enum: [sem_preferencia, femenino, masculino]
 *     responses:
 *       200:
 *         description: Perfil atualizado
 *       400:
 *         description: Erro na atualização
 */
profileRouter.put("/profile", authMiddleware, editProfileController);

export default profileRouter;
