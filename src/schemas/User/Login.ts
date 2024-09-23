import { z } from "zod";

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;
const regexSpace = /^\S+$/;

const schemaLogin = z.object({
  email: z
    .string()
    .regex(regexMail, { message: "O campo email precisa ser minúsculas" })
    .email({ message: "O campo email precisa estar em um formato válido!" })
    .refine((val) => val.trim() !== "", {
      message: "O campo email não pode estar vazio!",
    }),

  nick_name: z
    .string()
    .regex(regexSpace, { message: "O campo nick name não é permitido espaços" })
    .refine((val) => val.trim() !== "", {
      message: "O campo nick name não pode estar vazio!",
    }),

  password: z
    .string()
    .regex(regexSpace, { message: "O campo senha não é permitido espaços" })
    .min(8, { message: "O campo senha precisa ter 8 caracteres." })
    .refine((val) => val.trim() !== "", {
      message: "O campo senha não pode estar vazio!",
    }),
});

export default schemaLogin;
