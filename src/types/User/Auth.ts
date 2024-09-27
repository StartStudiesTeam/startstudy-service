import { z } from "zod";

const schemaAuth = z.object({
  id: z.string().optional(), // Isso deve ser opcional
  name: z.string().min(2).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8).nonempty(),
  nick_name: z.string().nonempty(),
  phone_number: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "O campo Telefone não pode estar vazio!",
    }),
});

export default schemaAuth;
