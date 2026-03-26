import type { Request, Response } from "express";
import { createProfileService } from "../../service/profile/createProfile.service.js";

export async function createProfileController(
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
        const result = await createProfileService(user_id, req.body);

        if (result?.error) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}
