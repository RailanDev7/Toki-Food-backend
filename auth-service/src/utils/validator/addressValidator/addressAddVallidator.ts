import { z } from "zod";

export const addressSchema = z.object({
  cep: z.string().min(4, "CEP must have at least 4 characters"),
  rua: z.string().min(4, "Street must have at least 4 characters"),
  numero: z.string().min(1, "House number is required"),
  bairro: z.string().min(4, "Neighborhood must have at least 4 characters"),
  cidade: z.string().min(4, "City must have at least 4 characters"),
  estado: z.string().min(2, "State must have at least 2 characters"),
  complemento: z.string().optional(),
  latitude: z.string().min(4, "Invalid latitude value"),
  longitude: z.string().min(4, "Invalid longitude value"),
  user_id: z.number().min(1, "Invalid user ID")
});

export function validateAddressData(data: unknown) {
  return addressSchema.safeParse(data);
}