const express = require("express");
const { registerUser, loginUser } = require("../controllers/users/user");
const { middlewareRegisterUser } = require("../middlewares/validateJoi");
const { authenticationUser } = require("../middlewares/token");
const { queryValidationMail } = require("../controllers/users/mails");

const schemaAuth = require("../schemas/schemaUserAuth");
const schemaLogin = require("../schemas/schemaLogin");
const schemaMailUser = require("../schemas/schemaMail");

const route = express();

route.post("/SignUp", middlewareRegisterUser(schemaAuth), registerUser);
route.post("/SignIn", middlewareRegisterUser(schemaLogin), loginUser);
route.use(authenticationUser);

route.get(
  "/ConfirmEmail",
  middlewareRegisterUser(schemaMailUser),
  queryValidationMail
);

module.exports = route;
