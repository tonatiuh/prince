'use strict';

/*
 * Logger library
 * */
const winston = require('winston');
const nconf   = require('nconf');

let fileName = nconf.get('logs') || './log/current.log';
let logger   = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ timestamp: true }),
    new (winston.transports.File)({ filename: fileName })
  ],
  exitOnError: false
});

module.exports = logger;
