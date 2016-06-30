var Repository = require('./repository');
var songFactory = require('./model/songFactory');

function Setlist(){
  var SETLIST_FILE = 'src/data/setlist.json';
  var setlistRepo = new Repository(SETLIST_FILE);

  this.all = function(req, res) {
    setlistRepo.all(function(data){
      res.json(data);
    });
  };

  this.save = function(req, res) {

    var song = songFactory.fromSongish(req.body);

    setlistRepo.add(song, function(data){
      res.json(data);
    });
  };

  this.update = function(req, res) {
    setlistRepo.update(
      songFactory.fromSongish(req.body),
      songFactory.createQueryById(req.body.id), function(data){
      res.json(data);
    });
  };
}

module.exports = Setlist;
