import { z } from "zod";

const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;

const schemaMailCheck = z.object({
  email: z
    .string()
    .regex(regexMail, { message: "O campo email precisa ser minúsculas" })
    .email({ message: "O campo email precisa estar em um formato válido!" })
    .refine((val) => val.trim() !== "", {
      message: "O campo email não pode estar vazio!",
    }),
});

export default schemaMailCheck;
