import { prisma } from "../../utils/prismaClient.js";
import { validateProfileData } from "../../utils/validator/profileValidator/profile.js";
import { Gender } from "@prisma/client";

export interface CreateProfileData {
    photo?: string;
    bio?: string;
    genero?: Gender;
}

export async function createProfileService(
    user_id: number,
    data: CreateProfileData
) {
    try {
        if (!user_id || typeof user_id !== "number") {
            return {
                error: true,
                message: "Invalid user id"
            };
        }

        const validation = validateProfileData(data);
        if (!validation.success) {
            return {
                error: true,
                message: "Invalid profile data",
                details: validation.error.flatten()
            };
        }

        const existingProfile = await prisma.profile.findFirst({
            where: {
                user_id
            }
        });

        if (existingProfile) {
            return {
                error: true,
                message: "Profile already exists for this user"
            };
        }

        const profile = await prisma.profile.create({
            data: {
                user_id,
                photo: validation.data.photo ?? null,
                bio: validation.data.bio ?? null,
                genero: validation.data.genero ?? "sem_preferencia"
            }
        });

        return {
            success: true,
            data: profile
        };

    } catch (error) {
        console.error("createProfileService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
