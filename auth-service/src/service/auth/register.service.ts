import bcrypt from "bcrypt";
import { prisma } from "../../utils/prismaClient.js";
import { validateRegistrationData } from "../../utils/validator/email.js";

export async function RegisterAuth(name: string, email: string, password: string) {
    try {

        const result = validateRegistrationData({
            name,
            email,
            password
        });

        if (!result.success) {
            return {
                success: false,
                error: result.error.issues
            };
        }

        const emailExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (emailExists) {
            return {
                success: false,
                error: "Email already registered"
            };
        }

        // hash seguro da senha
        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
        });

        return {
            success: true,
            message: "Account created successfully"
        };

    } catch (error) {

        console.error("Error in registration:", error);

        return {
            success: false,
            error: "Internal server error"
        };
    }
}