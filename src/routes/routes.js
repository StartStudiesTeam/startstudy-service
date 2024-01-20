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
const validationCodeTokenQuery = require("../controllers/codeToken/codeToken");

const route = express();

route.post("/signup", middlewareRegisterUser(schemaAuth), registerUser);
route.post("/signin", middlewareRegisterUser(schemaLogin), loginUser);
route.get("/mailcheck", middlewareRegisterUser(schemaMailUser), mailCheckQuery);
route.put("/forgetpassword", passwordForget);
route.patch("/confirmationtoken", validationCodeTokenQuery);

route.use(authenticationUser);

route.put("/updatepassword", newPassword);
route.patch("/updateuser", updateUser);
route.delete("/deleteuser", deleteUser);

module.exports = route;
