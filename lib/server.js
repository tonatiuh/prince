'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const Logger     = require('./logger');
const nconf      = require('nconf');

let homeController = require('../controllers/home');

class Server {

  constructor(){
    this.app = express();
    this.configure();
  }

  configure(){
    this.app.set('view engine', 'ejs');
    this.app.engine('html', require('ejs').renderFile);
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended : true }));

    this.app.use(homeController.middleware);

    this.protocol = nconf.get('ssl').ENABLED ? 'https' : 'http';
    this.PORT     = process.env.PORT || nconf.get('port') || 3330;

    this[this.protocol]();
  }

  http(){
    Logger.info('[Lib Server]', 'Creating http server');
    this.server = require('http').createServer(this.app);
    this.server.listen(this.PORT, this.onReady.bind(this));
  }

  https(){
    Logger.info('[Lib Server]', 'Creating https server');
    // TODO
  }

  onReady(){
    Logger.info('[Lib Server]', 'Server running: ', this.server.address());
  }
}

// Export server
module.exports = Server;
