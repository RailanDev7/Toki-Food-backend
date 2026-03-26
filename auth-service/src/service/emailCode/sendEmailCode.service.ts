import { prisma } from "../../utils/prismaClient.js";
import { randomBytes } from "crypto";
import "dotenv/config";

export async function sendEmailCodeService(user_id: number) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        // Verificar se usuário existe
        const user = await prisma.user.findUnique({
            where: { id: user_id }
        });

        if (!user) {
            return {
                error: true,
                message: "User not found"
            };
        }

        // Gerar código de 6 dígitos
        const code = randomBytes(3).toString("hex").toUpperCase();
        
        // Código expira em 15 minutos
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        // Remover códigos antigos do usuário
        await prisma.email_code.deleteMany({
            where: { user_id }
        });

        // Criar novo código
        const emailCode = await prisma.email_code.create({
            data: {
                user_id,
                code,
                expiresAt,
                verification: "nao_verificado"
            }
        });

        // TODO: Enviar email com o código
        console.log(`Email code for user ${user_id}: ${code}`);

        return {
            success: true,
            message: "Verification code sent",
            expiresAt: emailCode.expiresAt
        };

    } catch (error) {
        console.error("sendEmailCodeService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
