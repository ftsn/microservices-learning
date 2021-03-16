const errors = require('./errorTypes')
const Logger = require('./libs/winstonLogger')

module.exports = new errorHandler();

function errorHandler() {
    this.handleError = async (error, responseStream) => {
        if (this.isTrustedError(error) === true) {
            const errStr = error.httpCode ? error.name + ' :' + error.message + '\nAssociated status code: ' + error.httpCode : error.name + ' :' + error.message;
            Logger.warn(errStr);
            if (responseStream) {
                responseStream.status(error.httpCode);
                responseStream.send(error.message);
            }
        }
        else {
            if (responseStream) {
                responseStream.status(500);
                responseStream.send(error.message);
            }
            Logger.error(error.name + ': ' + error.message);
            setTimeout(() => process.exit(1), 3000);
        }
    };

    this.isTrustedError = (error) => {
        if (error instanceof errors.AppError) {
            return error.isOperational;
        }
        return false;
    };
}