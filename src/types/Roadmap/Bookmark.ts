import { z } from "zod";

const schemaSave = z.object({
  id: z
    .string()
    .min(10, { message: "O campo id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O campo id não pode estar vazio!" }),

  userId: z
    .string()
    .min(10, {
      message: "O campo User Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo User Id não pode estar vazio!" }),

  videoId: z
    .string()
    .min(10, {
      message: "O campo Video Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo Video Id não pode estar vazio!" }),

  roadmapId: z
    .string()
    .min(10, {
      message: "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo Roadmap Id não pode estar vazio!" }),
});

export default schemaSave;
