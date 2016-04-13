'use strict';

const Logger   = require('../lib/logger');
const path     = require('path');
const _        = require('underscore');
const fs       = require('fs');

//TODO Log, refactor
module.exports = {

  list : function(req, res){
    var blackList = ['.DS_Store', '.keep'];
    var directory = path.join(process.cwd(), 'enemies');
    var folders   = fs.readdirSync(directory);

    var enemies   = _.reject(folders, function(element){
      return _.contains(blackList, element);
    });

    enemies = _.map(enemies, function(name){
      var obj    = { name : name };
      name = name.replace(/ /g, '_');
      var host = path.join(process.cwd(), '/enemies/', name, '/host');
      obj.planet = fs.readFileSync(host).toString();
      return obj;
    });

    return res.send(enemies);
  },

  create : function(req, res){
    var name   = req.body.name;
    var planet = req.body.planet;
    if(!name || !planet){ return res.status(400).send('Missing Information'); }
    name = name.replace(/ /g, '_');

    var directory = path.join(process.cwd(), 'enemies');
    var list      = fs.readdirSync(directory);

    if(_.contains(list, name)){ return res.status(400).send('All ready exists'); }

    var folder = path.join(directory, name);
    fs.mkdirSync(folder);
    fs.writeFileSync(folder + '/host', planet);
    return res.send('Saved');
  }

};

