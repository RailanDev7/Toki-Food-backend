import { prisma } from "../../utils/prismaClient.js";
import { validateProfileData } from "../../utils/validator/profileValidator/profile.js";
import { Gender } from "@prisma/client";

export interface EditProfileData {
    photo?: string;
    bio?: string;
    genero?: Gender;
}

export async function editProfileService(
    user_id: number,
    data: EditProfileData
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

        if (!existingProfile) {
            return {
                error: true,
                message: "Profile not found"
            };
        }

        const profile = await prisma.profile.update({
            where: {
                id: existingProfile.id
            },
            data: {
                photo: validation.data.photo ?? existingProfile.photo,
                bio: validation.data.bio ?? existingProfile.bio,
                genero: validation.data.genero ?? existingProfile.genero
            }
        });

        return {
            success: true,
            data: profile
        };

    } catch (error) {
        console.error("editProfileService error:", error);
        return {
            error: true,
            message: "Database error"
        };
    }
}
