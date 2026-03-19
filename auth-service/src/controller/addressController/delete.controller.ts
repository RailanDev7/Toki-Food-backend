import { deleteAddress } from "../../service/address/delete.service.js";
import type { Response, Request } from "express";

export async function deleteController(
    req: Request,
    res: Response
) {
    try {
       
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
                error: "ID inválido"
            });
        }

   
        const result = await deleteAddress(id, user_id);

        
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }

    } catch (error) {
        console.error("DeleteController error:", error);

        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}
