import { Router } from "express";
import { getUserController } from "../../controller/user/getUser.controller.js";
import { deleteUserController } from "../../controller/user/deleteUser.controller.js";
import { authMiddleware } from "../../middleware/jwt/jsonwebtoken.midle.js";

const userRouter = Router();

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Buscar dados do usuário logado
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get("/user/me", authMiddleware, getUserController);

/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: Deletar conta do usuário
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado
 *       400:
 *         description: Erro ao deletar
 */
userRouter.delete("/user/me", authMiddleware, deleteUserController);

export default userRouter;
