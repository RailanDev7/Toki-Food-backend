import { prisma } from "../../utils/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import "dotenv/config";



export async function loginService(email: string, password: string) {
    try {

        console.log("JWT_CODE in login:", process.env.JWT_CODE ? "exists" : "NOT FOUND");

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
        
        const secret = process.env.JWT_CODE;
        if (!secret) {
            console.error("JWT_CODE not found in login service");
            return {
                success: false,
                message: "Server configuration error"
            };
        }
        
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
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

