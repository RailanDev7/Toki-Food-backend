import { editAddressService } from "../../service/address/editAddress.service.js";
import type { Request, Response } from "express";



export async function editAddressController(
    req: Request,
    res: Response) {
    try {
        const data = req.body;

        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }

        const user_id = req.user.id;

        // Valida o id do endereço
        const id = Number(req.params.id);
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Inválid id"
            });
        }
        const result = await editAddressService(id, user_id, data)
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
}