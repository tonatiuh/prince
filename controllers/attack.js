'use strict';

const Logger   = require('../lib/logger');
const path     = require('path');
const spawn    = require('child_process').spawn;

//TODO Log, refactor
module.exports = {
  index : function(req, res){ return res.render('attack.html'); },

  attack: function(req, res){
    var time     = req.body.time;
    var rate     = req.body.rate;
    var name     = req.body.name;
    if(!time || !rate || !name){ return res.status(400).send('Missing Information'); }

    name = name.replace(/ /g, '_');
    var host   = path.join(process.cwd(), '/enemies/', name, '/host');
    var attack = spawn('sh', ['-c', "vegeta attack -targets="+host+" -rate="+rate+" -duration="+time+"s | vegeta report -reporter=plot -output=public/reports/"+name+".html"], { stdio: 'inherit' });
    attack.on('close', function(){
      return res.send('done');
    });
  }
};
