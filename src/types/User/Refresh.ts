import { z } from "zod";

const schemaRefresh = z.object({
  refresh_token: z
    .string()
    .min(10, {
      message: "O Refresh Token precisa ter no mínimo 10 caracteres.",
    })
    .refine((val) => val.trim() !== "", {
      message: "O Refresh Token não pode estar vazio!",
    }),
});

export default schemaRefresh;
