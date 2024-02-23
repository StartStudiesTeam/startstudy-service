require("dotenv/config");
const express = require("express");
const cors = require("cors");
const route = require("./routes/routes");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./documentation/swagger/swagger.json");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/v1", route);

module.exports = app;
