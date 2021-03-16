const http = require('http');
const Logger = require('./libs/winstonLogger');
const errorHandler = require('./errorHandler');
const app = require('./app');
const config = require('./config');

process.on("uncaughtException", error => {
    errorHandler.handleError(error);
});
process.on("unhandledRejection", (reason) => {
    throw reason;
});

const port = config.get('port');
app.set('port', port);

const server = http.createServer(app);

server.on('error', (error) => errorHandler.handleError(error));
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    Logger.info('Listening on ' + bind);
});

server.listen(port);
