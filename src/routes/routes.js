const express = require('express');
const { routeBarInitial } = require('../controllers/user');

const route = express();

route.get('/', routeBarInitial);

module.exports = route;
