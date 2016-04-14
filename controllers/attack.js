'use strict';

const Logger   = require('../lib/logger');
const path     = require('path');
const spawn    = require('child_process').spawn;
const _        = require('underscore');
const fs       = require('fs');

//TODO Log, refactor
module.exports = {
  index : function(req, res){ return res.render('attack.html'); },

  attack: function(req, res){
    var host     = req.body.host;
    var name     = req.body.name;
    var rate     = req.body.rate;
    var time     = req.body.time;
    var document = '';

    if(!host || !name || !time || !rate){ return res.status(400).send('Missing Information'); }

    var root = path.join(process.cwd(), '/enemies/', name);

    _.each(req.body.content, function(data){
      if(!data.method || !data.endpoint){ return true; }
      var reqBody = '@' + path.join(root, data.endpoint) + '.json';
      var rawHeaders;
      var rawBody;

      document+=data.method + ' ' + host + data.endpoint + '\n';

      try{
        rawHeaders = JSON.parse(data.headers);
      }catch(error){ rawHeaders = []; }

      try{
        rawBody = JSON.parse(data.body);
      }catch(error){ rawBody = null; }

      _.each(rawHeaders, function(header){
        document+=header + '\n';
      });

      if(rawBody && !_.isEmpty(rawBody)){ document+=reqBody +'\n\n'; }
    });

    fs.writeFileSync(root + '/target', document);

    var attack = spawn('sh', ['-c', "vegeta attack -targets="+root+"/target -rate="+rate+" -duration="+time+"s | vegeta report -reporter=plot -output=public/reports/"+name+".html"], { stdio: 'inherit' });
    attack.on('close', function(){
      return res.send('done'); //SocketIO
    });

    //return res.status(200).send('Working on it'); //TODO
  }
};
