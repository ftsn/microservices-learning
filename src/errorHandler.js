const errors = require('./errorTypes')
const Logger = require('./libs/winstonLogger')

module.exports = new errorHandler();

function errorHandler() {
    this.handleError = async (error, responseStream) => {
        if (this.isTrustedError(error) === true)
            Logger.warn(error.name + ' :' + error.message + '\nAssociated status code: ' + error.httpCode);
        else {
            responseStream.status(500);
            responseStream.send(error.message);
            Logger.error('Untrusted error. ' + error.name + ': ' + error.message);
            process.exit(1);
        }
        responseStream.status(error.httpCode);
        responseStream.send(error.message);
    };

    this.isTrustedError = (error) => {
        if (error instanceof errors.AppError) {
            return error.isOperational;
        }
        return false;
    };
}