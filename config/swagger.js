const {
  UserSignUp,
  UserSingIn,
  UserMailCheck,
  UserConfirmationToken,
  UserPasswordForget,
} = require("../src/documentation/exampleDocs/data");

module.exports = {
  info: {
    version: "1.0.0",
    title: "Start Studies API Documentation",
    contact: "startstudyservicemails@gmail.com",
    description: "Documentação da API da Start Studies",
  },
  host: "www.startstudies.com.br/api/v1",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    JWT: {
      description: "JWT token",
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
  definitions: {
    UserSignUp,
    UserSingIn,
    UserConfirmationToken,
    UserMailCheck,
    UserPasswordForget,
  },
};
