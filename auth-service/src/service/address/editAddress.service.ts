import { prisma } from "../../utils/prismaClient.js";
import { validateAddressData } from "../../utils/validator/addressValidator/addressAddVallidator.js";


export async function editAddressService(
    id: number,
    user_id: number,
    data: unknown) {
    try {
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
        const validation = await validateAddressData(data)
        if (!validation.success) {

            return {
                error: true,
                message: "Invalid address data",
                details: validation.error.flatten()
            };
        }
        await prisma.address.update({
            where: {
                id: id
            },
            data: {
                cep: validation.data.cep,
                rua: validation.data.rua,
                numero: validation.data.numero ?? null,
                bairro: validation.data.bairro,
                cidade: validation.data.cidade,
                estado: validation.data.estado,
                complemento: validation.data.complemento ?? null,
                latitude: validation.data.latitude,
                longitude: validation.data.longitude,
            }
        })
        return {
            success: true,
            message: "Address edited successfully!"
        }
    } catch (error) {
        throw new Error("Database error");
    }
}