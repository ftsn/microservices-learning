const errors = require('../errorTypes');

exports.gatewayTest1 = function(req, res) {
    res.send('NOT IMPLEMENTED: Test1');
};

exports.gatewayTest2 = function(req, res, next) {
    const err = new errors.AppError('Test error', 403, 'Testing the error handler. The error code is 403 and will not make the process exit.', true);
    next(err);
};

exports.gatewayTest3 = function(req, res, next) {
    const err = new errors.AppError('Test error', 409, 'Testing the error handler. The error code is 409 and will make the process exit.', false);
    next(err);
};