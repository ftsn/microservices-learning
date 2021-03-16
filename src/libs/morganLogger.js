const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

// create a rotating write stream
const accessLogStream = rfs.createStream('requests.log', {
    size: "10M",
    interval: "1d",
    path: path.join(__dirname, '../../logs')
});

// setup the logger
const morganMiddleware = morgan('combined', { stream: accessLogStream });

module.exports = morganMiddleware;