const errors = require('./errorTypes')

module.exports = new errorHandler();

function errorHandler() {
    // TODO add logging (and maybe mailing?)
    this.handleError = async (error, responseStream) => {
        console.log('In the error handler');
        responseStream.status(error.httpCode);
        responseStream.send(error.description);
        if (this.isTrustedError(error) === true)
            console.log('Trusted error; will not exit.');
        else {
            console.log('Untrusted error. exiting');
            process.exit(1);
        }
    };

    this.isTrustedError = (error) => {
        if (error instanceof errors.AppError) {
            return error.isOperational;
        }
        return false;
    };
}