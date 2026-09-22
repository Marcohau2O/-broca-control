import z, { email } from "zod"

export const loginSchema = z.object({
    body: z.object({
        correo: z
            .string()
            .trim()
            .email('El correo electrónico no es válido')
            .transform((value) => value.toLowerCase()),

        password: z
            .string()
            .min(1, 'La contraseña es obligatoria')
    }),
})

export type LoginBody = z.infer<typeof loginSchema>['body']