const express = require("express");
const app = express();

app.use('/ticket', require('./ticket'))

module.exports = app;
