import { z } from 'zod';


export const loginSchema = z.object({
    email: z.string().email("Por favor, insira um e-mail válido."),
    password: z.string().min(1, "A senha não pode estar em branco."),
});
