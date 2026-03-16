import { z } from "zod";

export const addressSchema = z.object({

  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, "Invalid CEP format"),

  rua: z
    .string()
    .min(3,"Street too short")
    .max(120,"Street too long"),

  numero: z
    .string()
    .min(1,"House number required")
    .max(20),

  bairro: z
    .string()
    .min(3)
    .max(80),

  cidade: z
    .string()
    .min(2)
    .max(80),

  estado: z
    .string()
    .length(2,"Use state code (BA, SP...)")
    .toUpperCase(),

  complemento: z
    .string()
    .max(120)
    .optional()
    .nullable(),

  latitude: z
    .number()
    .min(-90)
    .max(90),

  longitude: z
    .number()
    .min(-180)
    .max(180)

});

export function validateAddressData(data: unknown){
  return addressSchema.safeParse(data);
}