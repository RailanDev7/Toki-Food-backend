import { prisma } from "../../utils/prismaClient.js";

export async function deleteUserService(user_id: number) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        const user = await prisma.user.findUnique({
            where: { id: user_id }
        });

        if (!user) {
            return {
                error: true,
                message: "User not found"
            };
        }

        // Deletar em cascata usando transação
        await prisma.$transaction(async (tx) => {
            // Deletar código de email
            await tx.email_code.deleteMany({
                where: { user_id }
            });

            // Deletar endereços
            await tx.address.deleteMany({
                where: { user_id }
            });

            // Deletar perfil
            await tx.profile.deleteMany({
                where: { user_id }
            });

            // Deletar CPF
            await tx.userCPF.delete({
                where: { user_id }
            });

            // Deletar usuário
            await tx.user.delete({
                where: { id: user_id }
            });
        });

        return {
            success: true,
            message: "User deleted successfully"
        };

    } catch (error) {
        console.error("deleteUserService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
