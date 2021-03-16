const express = require('express');
const bodyParser = require('body-parser');
const morganMiddleware = require('./libs/morganLogger');
const gatewayRouter = require('./gateway/gatewayRouter');
const errorHandler = require('./errorHandler');

const app = express();

app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use('/api/gateway', gatewayRouter);

// eslint-disable-next-line no-unused-vars
app.use(async (err, req, res, next) => {
    await errorHandler.handleError(err, res);
});

module.exports = app;