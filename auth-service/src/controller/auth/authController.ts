import { RegisterAuth } from "../../service/auth/registerAuth.js";
import type { Request, Response } from "express";

export async function registerController(req: Request, res: Response) {
    try {

        const { name, email, password } = req.body;

        const result = await RegisterAuth(name, email, password);

        if (!result?.success) {
            return res.status(400).json({
                success: false,
                error: result?.error
            });
        }

        return res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Controller error:", error);

        return res.status(500).json({
            success: false,
            error: "Erro interno no servidor"
        });
    }
}