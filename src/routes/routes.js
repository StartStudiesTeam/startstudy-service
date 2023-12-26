const express = require("express");
const { registerUser, loginUser } = require("../controllers/users/user");
const { middlewareRegisterUser } = require("../middlewares/validateJoi");
const { authenticationUser } = require("../middlewares/token");

const schemaAuth = require("../schemas/schemaUserAuth");
const schemaLogin = require("../schemas/schemaLogin");

const route = express();

route.post("/register", middlewareRegisterUser(schemaAuth), registerUser);
route.post("/login", middlewareRegisterUser(schemaLogin), loginUser);
route.use(authenticationUser);

module.exports = route;
