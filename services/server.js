'use strict';

const Server  = require('../lib/server');
const Logger  = require('../lib/logger');

module.exports.start = function(){
  Logger.info('[Server Service]', 'Initialize server');
  this.server = new Server();
};
