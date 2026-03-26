import type { Request, Response } from "express";
import { userData } from "../../service/userCpf/usercpf.service.js";

export async function userCpfController(
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
        const result = await userData(req.body, user_id);

        if (result?.error) {
            return res.status(400).json(result);
        }

        return res.status(201).json({
            success: true,
            message: "User CPF data created"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}
