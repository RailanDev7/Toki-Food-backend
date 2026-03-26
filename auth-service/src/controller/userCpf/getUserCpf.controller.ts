import type { Request, Response } from "express";
import { prisma } from "../../utils/prismaClient.js";

export async function getUserCpfController(
    req: Request,
    res: Response
) {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized - No user id in token"
            });
        }

        const user_id: number = req.user.id;

        const userCpf = await prisma.userCPF.findUnique({
            where: { user_id }
        });

        if (!userCpf) {
            return res.status(404).json({
                error: true,
                message: "CPF data not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: userCpf
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}
