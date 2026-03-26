import { z } from "zod";
import { Gender } from "@prisma/client";

export const profileSchema = z.object({
    photo: z.string().url().optional().nullable(),
    bio: z.string().max(500).optional().nullable(),
    genero: z.nativeEnum(Gender).optional()
});

export function validateProfileData(data: unknown) {
    return profileSchema.safeParse(data);
}
