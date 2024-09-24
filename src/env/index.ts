import 'dotenv/config';
import { z } from 'zod';

const envSchemas = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  EMAIL_PASS: z.string(),
  EMAIL_NAME: z.string(),
  EMAIL_FROM: z.string().email(),
  EMAIL_SUBJECT_START: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  API_KEY: z.string()
});

const { success, data, error } = envSchemas.safeParse(process.env);

if (!success) {
  console.error("Variáveis de ambiente inválidas:", error.format());
  throw new Error("Variáveis de ambiente inválidas");
}

export const env = data;
