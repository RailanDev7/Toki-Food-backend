import { prisma } from "../../utils/prismaClient.js";

export async function checkVerificationStatusService(user_id: number) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        // Buscar código mais recente do usuário
        const emailCode = await prisma.email_code.findFirst({
            where: { user_id },
            orderBy: { createdAt: "desc" }
        });

        if (!emailCode) {
            return {
                success: true,
                verified: false,
                message: "No verification code found"
            };
        }

        // Verificar se o código expirou
        const isExpired = new Date() > emailCode.expiresAt;
        const isVerified = emailCode.verification === "verificado";

        return {
            success: true,
            verified: isVerified && !isExpired,
            status: isVerified ? "verificado" : isExpired ? "expirado" : "pendente",
            expiresAt: emailCode.expiresAt
        };

    } catch (error) {
        console.error("checkVerificationStatusService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
