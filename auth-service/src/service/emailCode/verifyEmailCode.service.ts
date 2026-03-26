import { prisma } from "../../utils/prismaClient.js";

export async function verifyEmailCodeService(user_id: number, code: string) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        if (!code || typeof code !== "string") {
            return {
                error: true,
                message: "Code is required"
            };
        }

        // Buscar código mais recente do usuário
        const emailCode = await prisma.email_code.findFirst({
            where: {
                user_id,
                code: code.toUpperCase()
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!emailCode) {
            return {
                error: true,
                message: "Invalid verification code"
            };
        }

        // Verificar se o código expirou
        if (new Date() > emailCode.expiresAt) {
            return {
                error: true,
                message: "Verification code expired"
            };
        }

        // Verificar se já foi verificado
        if (emailCode.verification === "verificado") {
            return {
                error: true,
                message: "Email already verified"
            };
        }

        // Marcar como verificado
        await prisma.email_code.update({
            where: { id: emailCode.id },
            data: { verification: "verificado" }
        });

        return {
            success: true,
            message: "Email verified successfully"
        };

    } catch (error) {
        console.error("verifyEmailCodeService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
