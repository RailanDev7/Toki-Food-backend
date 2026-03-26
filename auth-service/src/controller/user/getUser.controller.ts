import type { Request, Response } from "express";
import { getUserService } from "../../service/user/getUser.service.js";

export async function getUserController(
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
        const result = await getUserService(user_id);

        if (result?.error) {
            return res.status(404).json(result);
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
