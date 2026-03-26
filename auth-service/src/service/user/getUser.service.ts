import { prisma } from "../../utils/prismaClient.js";

export async function getUserService(user_id: number) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        const user = await prisma.user.findUnique({
            where: { id: user_id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                profile: {
                    select: {
                        id: true,
                        photo: true,
                        bio: true,
                        genero: true
                    }
                },
                usercpf: {
                    select: {
                        id: true,
                        cpf: true,
                        data_nasci: true
                    }
                },
                address: {
                    select: {
                        id: true,
                        cep: true,
                        rua: true,
                        numero: true,
                        bairro: true,
                        cidade: true,
                        estado: true
                    }
                }
            }
        });

        if (!user) {
            return {
                error: true,
                message: "User not found"
            };
        }

        return {
            success: true,
            data: user
        };

    } catch (error) {
        console.error("getUserService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
