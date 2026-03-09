import { prisma } from "../../utils/prismaClient.js";
import { validateAddressData } from "../../utils/validator/addressValidator/addressAddVallidator.js";

export async function addressService(data: unknown) {
  try {

    const validation = validateAddressData(data);

    if (!validation.success) {
      return {
        error: true,
        message: "Invalid address data",
        details: validation.error.flatten()
      };
    }

    const addressData = {
      ...validation.data,
      complemento: validation.data.complemento ?? null
    };

    // LIMIT: max 5 addresses per user
    const addressCount = await prisma.address.count({
      where: {
        user_id: addressData.user_id
      }
    });

    if (addressCount >= 5) {
      return {
        error: true,
        message: "Address limit reached. Maximum 5 addresses allowed."
      };
    }

    // SPAM CHECK: prevent duplicate address
    const existingAddress = await prisma.address.findFirst({
      where: {
        user_id: addressData.user_id,
        cep: addressData.cep,
        rua: addressData.rua,
        numero: addressData.numero ?? null,
        bairro: addressData.bairro,
        cidade: addressData.cidade,
        estado: addressData.estado
      }
    });

    if (existingAddress) {
      return {
        error: true,
        message: "This address already exists for this user."
      };
    }

    await prisma.address.create({
      data: addressData
    });

    return {
      success: true,
      message: "Address created successfully",
    };

  } catch (error) {

    return {
      error: true,
      message: "Error saving address"
    };

  }
}