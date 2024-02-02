const express = require("express");

const { middlewareSchema } = require("../middlewares/validationJoi");
const { authenticationUser } = require("../middlewares/authenticate");

const schemaAuth = require("../schemas/schemaAuth");
const schemaLogin = require("../schemas/schemaLogin");
const schemaMailCheck = require("../schemas/schemaMail");
const schemaNewPassword = require("../schemas/schemaNewPassword");
const schemaCodeToken = require("../schemas/schemaToken");

const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const mailCheckQuery = require("../controllers/mails/mails");
const deleteUser = require("../controllers/users/delete");
const newPassword = require("../controllers/password/newPassword");
const updatePassword = require("../controllers/password/updatePassword");
const updateUser = require("../controllers/users/update");
const validationCodeToken = require("../controllers/codeToken/codeToken");
const refreshTokenUser = require("../controllers/users/refresh");

const route = express();

route.post("/signup", middlewareSchema(schemaAuth), registerUser);
route.post("/signin", middlewareSchema(schemaLogin), loginUser);
route.post("/mailcheck", middlewareSchema(schemaMailCheck), mailCheckQuery);

route.patch(
  "/confirmationtoken",
  middlewareSchema(schemaCodeToken),
  validationCodeToken
);

route.post("/refreshtoken", refreshTokenUser);

route.use(authenticationUser);

route.put("/newpassword", middlewareSchema(schemaNewPassword), newPassword);

route.put("/updatepassword", updatePassword);
route.patch("/updateuser", updateUser);

route.delete("/deleteuser", deleteUser);

module.exports = route;
