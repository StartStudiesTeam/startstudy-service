import { z } from "zod";

const schemaVideos = z.object({
  id: z
    .string()
    .min(10, { message: "O id precisa ter no mínimo 10 caracteres." })
    .min(1, { message: "O id não pode estar vazio!" }),

  roadmapId: z
    .string()
    .min(10, {
      message: "O campo Roadmap Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo Roadmap Id não pode estar vazio!" }),

  title: z
    .string()
    .min(4, { message: "O título precisa ter no mínimo 4 caracteres." })
    .min(1, { message: "O título não pode estar vazio!" }),

  video: z.string().min(1, { message: "O vídeo não pode estar vazio!" }),

  videoId: z
    .string()
    .min(10, {
      message: "O campo Video Id precisa ter no mínimo 10 caracteres.",
    })
    .min(1, { message: "O campo Video Id não pode estar vazio!" }),

  description: z
    .string()
    .min(1, { message: "A descrição não pode estar vazia!" }),
});

export default schemaVideos;
