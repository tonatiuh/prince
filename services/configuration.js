'use strict';
const nconf = require('nconf');

module.exports.start = function(){
  nconf.argv().env();
  let enviroment = nconf.get('NODE_ENV') || 'development';
  let file       = './config/'+enviroment+'.json';
  nconf.file({ file: file });
};
