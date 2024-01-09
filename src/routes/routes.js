const express = require("express");
const { middlewareRegisterUser } = require("../middlewares/validateJoi");
const { authenticationUser } = require("../middlewares/token");
const schemaAuth = require("../schemas/schemaUserAuth");
const schemaLogin = require("../schemas/schemaLogin");
const schemaMailUser = require("../schemas/schemaMail");
const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const queryCheckEmail = require("../controllers/mails/mails");

const route = express();

route.post("/SignUp", middlewareRegisterUser(schemaAuth), registerUser);
route.post("/SignIn", middlewareRegisterUser(schemaLogin), loginUser);
route.use(authenticationUser);

route.get(
  "/ConfirmEmail",
  middlewareRegisterUser(schemaMailUser),
  queryCheckEmail
);

module.exports = route;
