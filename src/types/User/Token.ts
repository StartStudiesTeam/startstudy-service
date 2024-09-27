import { z } from "zod";

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const schemaCodeToken = z.object({
  email: z
    .string()
    .regex(regexMail, { message: "O campo email precisa ser minúsculas" })
    .email({ message: "O campo email precisa estar em um formato válido!" })
    .refine((val) => val.trim() !== "", {
      message: "O campo email não pode estar vazio!",
    }),

  codeToken: z
    .string()
    .min(6, { message: "O campo token precisa ter 6 caracteres." })
    .refine((val) => val.trim() !== "", {
      message: "O campo token não pode estar vazio!",
    }),
});

export default schemaCodeToken;
