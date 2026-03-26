import { prisma } from "../../utils/prismaClient.js";

export async function getProfileService(user_id: number) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        const profile = await prisma.profile.findFirst({
            where: {
                user_id
            },
            select: {
                id: true,
                photo: true,
                bio: true,
                genero: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!profile) {
            return {
                error: true,
                message: "Profile not found"
            };
        }

        return {
            success: true,
            data: profile
        };

    } catch (error) {
        console.error("getProfileService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
