const express = require("express");
const { get } = require("http");
const CakeRouter = express.Router();
const {CakeController} = require('../controllers/CakeController');


CakeRouter
    .post('/rate', CakeController.addRate);

module.exports = {CakeRouter}