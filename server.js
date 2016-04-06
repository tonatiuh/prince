var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var exec       = require('child_process').exec;
var fs         = require('fs');
var path       = require('path');
var _          = require('underscore');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){ return res.render('index.html'); });
app.get('/attack', function(req, res){ return res.render('attack.html'); });

app.get('/enemy', function(req, res){
  var blackList = ['.DS_Store'];
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
});

app.post('/enemy', function(req, res){
  var name   = req.body.name;
  var planet = req.body.planet;
  if(!name || !planet){ return res.status(400).send('Missing Information'); }
  name = name.replace(/ /g, '_');

  var directory = path.join(process.cwd(), 'enemies');
  var list      = fs.readdirSync(directory);

  if(_.contains(list, name)){ return res.status(400).send('All ready exists'); }

  var folder = path.join(directory, name);
  fs.mkdirSync(folder);
  fs.writeFileSync(folder + '/host', 'GET ' + planet); //TODO
  return res.send('Saved');
});

app.post('/attack', function(req, res){
  var time     = req.body.time;
  var rate     = req.body.rate;
  var name     = req.body.name;
  if(!time || !rate || !name){ return res.send(400).send('Missing Information'); }

  name = name.replace(/ /g, '_');
  var host   = path.join(process.cwd(), '/enemies/', name, '/host');
  exec("vegeta attack -targets="+host+" -rate="+rate+" -duration="+time+"s | vegeta report -reporter=plot -output=public/reports/"+name+".html", function(error){
    return res.send('done');
  });
});


app.listen(3330);
