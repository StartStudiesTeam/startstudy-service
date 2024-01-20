const swaggerAutogen = require("swagger-autogen")();
const doc = require("../config/swagger");

const outputFile = "./documentation/swagger/swagger.json";
const endpoints = ["./routes/routes.js"];

swaggerAutogen(outputFile, endpoints, doc);
