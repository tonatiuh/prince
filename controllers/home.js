'use strict';

const Logger   = require('../lib/logger');

module.exports = {

  middleware : function(req, res, next){
    Logger.info('[Middleware]', 'Incomming Request: ', req.url, req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    return next();
  },

  index : function(req, res){ return res.render('index.html'); }

};
