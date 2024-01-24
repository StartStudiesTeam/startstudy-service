const express = require("express");

const { middlewareSchema } = require("../middlewares/validateJoi");
const { authenticationUser } = require("../middlewares/token");

const schemaAuth = require("../schemas/schemaAuth");
const schemaLogin = require("../schemas/schemaLogin");
const schemaMailCheck = require("../schemas/schemaMail");
const schemanNewPassword = require("../schemas/schemaNewPassword");
const schemanCodeToken = require("../schemas/schemaToken");

const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const mailCheckQuery = require("../controllers/mails/mails");
const deleteUser = require("../controllers/users/delete");
const newPassword = require("../controllers/password/newPassword");
const updatePassword = require("../controllers/password/updatePassword");
const updateUser = require("../controllers/users/update");
const validationCodeToken = require("../controllers/codeToken/codeToken");

const route = express();

route.post("/signup", middlewareSchema(schemaAuth), registerUser);
route.post("/signin", middlewareSchema(schemaLogin), loginUser);
route.post("/mailcheck", middlewareSchema(schemaMailCheck), mailCheckQuery);

route.patch(
  "/confirmationtoken",
  middlewareSchema(schemanCodeToken),
  validationCodeToken
);
route.put("/newpassword", middlewareSchema(schemanNewPassword), newPassword);

route.use(authenticationUser);

route.put("/updatepassword", updatePassword);
route.patch("/updateuser", updateUser);

route.delete("/deleteuser", deleteUser);

module.exports = route;
