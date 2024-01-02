require("dotenv/config");
const express = require("express");
const route = require("./routes/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./documentation/swagger/swagger.json");

const app = express();
app.use(express.json());
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(route);

app.listen(process.env.PORT);
