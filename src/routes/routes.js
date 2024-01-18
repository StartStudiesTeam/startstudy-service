const express = require("express");

const { middlewareRegisterUser } = require("../middlewares/validateJoi");
const { authenticationUser } = require("../middlewares/token");

const schemaAuth = require("../schemas/schemaUserAuth");
const schemaLogin = require("../schemas/schemaLogin");
const schemaMailUser = require("../schemas/schemaMail");

const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const mailCheckQuery = require("../controllers/mails/mails");
const deleteUser = require("../controllers/users/delete");
const passwordForget = require("../controllers/password/forgetPassword");
const newPassword = require("../controllers/password/newPassword");
const updateUser = require("../controllers/users/update");

const route = express();

route.post("/SignUp", middlewareRegisterUser(schemaAuth), registerUser);
route.post("/SignIn", middlewareRegisterUser(schemaLogin), loginUser);
route.get("/MailCheck", middlewareRegisterUser(schemaMailUser), mailCheckQuery);
route.put("/ForgetPassword", passwordForget);

route.use(authenticationUser);

route.put("/UpdatePassword", newPassword);
route.put("/UpdateUser", updateUser);
route.delete("/DeleteUser", deleteUser);

module.exports = route;
