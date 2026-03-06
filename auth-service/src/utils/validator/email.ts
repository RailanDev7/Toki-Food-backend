import {z} from "zod";



const registerSchema = z.object({
    name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
    email_user: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha precisa ter no mínimo 6 caracteres"),
});

export function validateRegistrationData( data: unknown) {
    return registerSchema.safeParse(data)
}
