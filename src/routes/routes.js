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
const newPassword = require("../controllers/password/newPassword");
const validationCodeToken = require("../controllers/codeToken/codeToken");
const refreshTokenUser = require("../controllers/users/refresh");
const createdRoadmap = require("../controllers/roadmap/create");
const updateRoadmap = require("../controllers/roadmap/update");
const deleteRoadmap = require("../controllers/roadmap/delete");

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

route.post("/roadmap", createdRoadmap);
route.put("/roadmap", updateRoadmap);
route.delete("/roadmap", deleteRoadmap);

route.get("/videos");
route.post("/videos");

module.exports = route;
