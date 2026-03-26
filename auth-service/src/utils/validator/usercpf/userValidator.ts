import { z } from 'zod';


const validateCPFSchema = z.object({
    cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Invalid CPF format"),
    data_nasci: z
    .string()
    .min(3,"Street too short")
    .max(120,"Street too long")
})


export function validacpfData(data: unknown){
  return validateCPFSchema.safeParse(data);
}