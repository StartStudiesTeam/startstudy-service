const express = require('express');
const { registerUser } = require('../controllers/users/user');
const { middlewareRegisterUser } = require('../middlewares/validateJoi');
const schemaAuth = require('../schemas/schamaUserAuth');

const route = express();

route.get('/register', middlewareRegisterUser(schemaAuth), registerUser);

module.exports = route;
