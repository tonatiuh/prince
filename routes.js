'use strict';

const server = require('./services/server').server;

let homeController   = require('./controllers/home');
let attackController = require('./controllers/attack');
let enemyController  = require('./controllers/enemy');

server.app.get('/' , homeController.index);

server.app.get('/attack' , attackController.index);
server.app.post('/attack' , attackController.attack);

server.app.get('/enemy' , enemyController.list);
server.app.post('/enemy' , enemyController.create);
