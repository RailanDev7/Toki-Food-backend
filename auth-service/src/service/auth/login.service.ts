
import { prisma } from "../../utils/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



export async function loginService(email: string, password: string) {
    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                password: true
            }
        });
        if (!user) {
            return {
                message: "Email or password incorrect"
            }
        }
        const passwordOk = await bcrypt.compare(password, user.password)
        if (!passwordOk) {
            return {
                message: "Email or password incorrect",
            }

        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_CODE!, { expiresIn: '1h' })
        return {
            success: true,
            token
        }
    } catch (error) {
        console.log('Server error', error)
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

