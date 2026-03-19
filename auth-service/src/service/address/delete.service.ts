import { prisma } from "../../utils/prismaClient.js";
import { Prisma } from "@prisma/client";

export async function deleteAddress(id: number, user_id: number) {
    try {
        // Primeiro verifica se o endereço existe e pertence ao usuário
        const existingAddress = await prisma.address.findFirst({
            where: {
                id: id,
                user_id: user_id
            }
        });

        if (!existingAddress) {
            return {
                success: false,
                message: "Address not found or does not belong to the user."
            };
        }


        await prisma.address.delete({
            where: {
                id: id
            }
        });

        return {
            success: true,
            message: "Address successfully deleted."
        };

    } catch (error) {
        console.error("DeleteService error:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return {
                    success: false,
                    message: "Address not found"
                };
            }
        }

        throw new Error("Error deleting address");
    }
}
