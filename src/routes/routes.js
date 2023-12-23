const express = require("express");
const { registerUser, loginUser } = require("../controllers/users/user");
const { middlewareRegisterUser } = require("../middlewares/validateJoi");
const schemaAuth = require("../schemas/schemaUserAuth");
const schemaLogin = require("../schemas/schemaLogin");
const { authenticationUser } = require("../middlewares/token");
const knex = require("../database/connection");

const route = express();

route.get("/register", middlewareRegisterUser(schemaAuth), registerUser);
route.post("/login", middlewareRegisterUser(schemaLogin), loginUser);
route.use(authenticationUser);

module.exports = route;
