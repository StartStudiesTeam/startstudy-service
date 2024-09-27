import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import route from "./routes/routes";

import { serve, setup } from "swagger-ui-express";
import swaggerFile from "./documentation/swagger/swagger.json";

const app = express();

app.use(json());
app.use(cors());
app.use("/api/v1/docs", serve, setup(swaggerFile));
app.use("/api/v1", route);

export default app;
