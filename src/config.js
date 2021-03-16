require('dotenv').config()
const convict = require('convict');
const convictFormatWithValidator = require('convict-format-with-validator');
const path = require('path');
const errorHandler = require('./errorHandler');
const errors = require('./errorTypes');

const configDir = path.join(__dirname, 'config/');

convict.addFormat(convictFormatWithValidator.ipaddress);

// Define a schema
const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'dev', 'test'],
        default: 'dev',
        env: 'NODE_ENV'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
});

const env = config.get('env');
try {
    config.loadFile(configDir + env + '.json');
} catch(error) {
    errorHandler.handleError(new errors.AppError('Opening config file', null, 'Cannot read the config file (' + configDir + env + '.json): ' + error.message, false));
}

try {
    config.validate({allowed: 'strict'});
} catch(error) {
    errorHandler.handleError(new errors.AppError('Processing config file', null, 'Error in the config file (' + configDir + env + '.json): ' + error.message, false));
}

module.exports = config;