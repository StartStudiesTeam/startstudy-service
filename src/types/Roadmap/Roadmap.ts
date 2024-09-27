import { z } from "zod";

const schemaRoadmap = z.object({
  userId: z
    .string()
    .min(10, { message: "O campo id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O campo id não pode estar vazio!" }),

  roadmapId: z
    .string()
    .min(10, {
      message: "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo Roadmap Id não pode estar vazio!" }),

  title: z
    .string()
    .min(3, { message: "O campo title precisa ter no mínimo 3 caracteres." })
    .min(1, { message: "O campo title não pode estar vazio!" }),

  description: z
    .string()
    .min(1, { message: "O campo description não pode estar vazio!" }),
});

export default schemaRoadmap;
