'use strict';

const Logger   = require('../lib/logger');
const path     = require('path');
const spawn    = require('child_process').spawn;
const _        = require('underscore');
const fs       = require('fs');
const url      = require('url');

let utils = require('../lib/utils');

module.exports = {
  index : function(req, res){ return res.render('attack.html'); },

  attack: function(req, res){

    if(!utils.mustHave(req.body, ['host', 'name', 'rate', 'time'])){
      return res.status(400).send('Missing Information');
    }

    let root     = path.join(process.cwd(), '/enemies/', req.body.name);
    let document = fs.createWriteStream( root + '/target');

    _.each(req.body.content, function(data){

      let reqBody  = '@' + path.join(root, data.endpoint) + '.json';
      let rawHeaders;

      document.write(data.method + ' ' + url.resolve(req.body.host, data.endpoint) + '\n');

      try{
        rawHeaders = JSON.parse(data.headers);
      }catch(error){ rawHeaders = []; }

      _.each(rawHeaders, function(header){
        document.write(header + '\n');
      });

      fs.writeFile(path.join(root, data.endpoint) + '.json', data.body, function(){ /* */ });
      document.write(reqBody +'\n\n');
    });

    document.end();

    let attack = spawn('sh', ['-c', "vegeta attack -targets="+root+"/target -rate="+req.body.rate+" -duration="+req.body.time+"s | vegeta report -reporter=plot -output=public/reports/"+req.body.name+".html"], { stdio: 'inherit' });
    attack.on('close', function(){
      return res.send('done'); //SocketIO
    });
  }
};
