const express = require('express');


const app = express();
const router = require('./routes/api');

app.use("/api/v1", router);

module.exports = app;