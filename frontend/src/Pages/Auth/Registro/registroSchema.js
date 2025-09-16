import { z } from 'zod/v4';

export const registerSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: 'Senhas não conferem',
    path: ['password_confirmation'],
});
