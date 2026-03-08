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
                error: "Email já cadastrado"
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
            message: "Conta criada com sucesso"
        };

    } catch (error) {

        console.error("Erro no registro:", error);

        return {
            success: false,
            error: "Erro interno no servidor"
        };
    }
}