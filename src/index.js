require("dotenv/config");
const express = require("express");
const route = require("./routes/routes");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./documentation/swagger/swagger.json");

const app = express();

app.use(express.json());
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/v1", route);

app.listen(process.env.PORT);
