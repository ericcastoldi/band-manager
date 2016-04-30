var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Setlist = require('./src/api/setlist');
var setlist = new Setlist();

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');

    next();
});

app.get('/api/setlist', setlist.all);
app.post('/api/setlist', setlist.update);


app.listen(app.get('port'), function() {
  console.log('The dark magic is happening at http://localhost:' + app.get('port') + '/');
});