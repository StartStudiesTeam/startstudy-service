import { z } from "zod";

const schemaTags = z.object({
  id: z
    .string()
    .min(10, { message: "O campo id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O campo id não pode estar vazio!" }),

  roadmapId: z
    .string()
    .min(10, {
      message: "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo Roadmap Id não pode estar vazio!" }),

  tag: z
    .string()
    .max(50, { message: "A Tag precisa ter no máximo 50 caracteres." })
    .min(1, { message: "A Tag não pode estar vazia!" }),
});

export default schemaTags;
