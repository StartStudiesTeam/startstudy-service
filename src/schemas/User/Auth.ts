import { z } from "zod";

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const regexSpace = /^\S+$/;

const schemaAuth = z.object({
  id: z
    .string()
    .min(10, { message: "O campo id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O campo id não pode estar vazio!" }),

  name: z
    .string()
    .min(2, { message: "O campo nome precisa ter no mínimo 2 caracteres." })
    .min(1, { message: "O campo nome não pode estar vazio!" }),

  email: z
    .string()
    .email({ message: "O campo email precisa estar em um formato válido!" })
    .regex(regexMail, { message: "O campo email precisa ser minúsculas" })
    .min(1, { message: "O campo email não pode estar vazio!" }),

  password: z
    .string()
    .min(8, { message: "O campo senha precisa ter 8 caracteres." })
    .regex(regexSpace, { message: "O campo senha não é permitido espaços" })
    .min(1, { message: "O campo senha não pode estar vazio!" }),

  nick_name: z
    .string()
    .regex(regexSpace, { message: "O campo nick name não é permitido espaços" })
    .min(1, { message: "O campo nick name não pode estar vazio!" }),

  phone_number: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "O campo Telefone não pode estar vazio!",
    }),
});

export default schemaAuth;
