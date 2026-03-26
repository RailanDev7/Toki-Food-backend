import type { Request, Response } from "express";
import { verifyEmailCodeService } from "../../service/emailCode/verifyEmailCode.service.js";

export async function verifyEmailCodeController(
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
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                error: true,
                message: "Code is required"
            });
        }

        const result = await verifyEmailCodeService(user_id, code);

        if (result?.error) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}
