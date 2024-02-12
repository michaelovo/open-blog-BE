const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = require('./routes/api');
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use("/api/v1", router);

module.exports = app;