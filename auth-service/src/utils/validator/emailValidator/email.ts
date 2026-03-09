import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must have at least 6 characters"),
});

export function validateRegistrationData(data: unknown) {
    return registerSchema.safeParse(data);
}