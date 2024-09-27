import { z } from "zod";

const schemaComments = z.object({
  id: z
    .string()
    .min(10, { message: "O id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O id não pode estar vazio!" }),

  videoId: z
    .string()
    .min(10, { message: "O Video Id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O Video Id não pode estar vazio!" }),

  roadmapId: z
    .string()
    .min(10, { message: "O Roadmap Id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O Roadmap Id não pode estar vazio!" }),

  comments: z
    .string()
    .max(256, { message: "O comentário precisa ter no máximo 256 caracteres." })
    .min(1, { message: "O comentário não pode estar vazio!" }),
});

export default schemaComments;
