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

app.use(async (err, req, res, next) => {
    await errorHandler.handleError(err, res);
});

process.on("uncaughtException", error => {
    errorHandler.handleError(error);
});
process.on("unhandledRejection", (reason) => {
    throw reason;
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
