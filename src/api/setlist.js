var Repository = require('./repository.js');
var songFactory = require('./model/songFactory.js');

function Setlist(){
  var SETLIST_FILE = 'src/data/setlist.json';
  var setlistRepo = new Repository(SETLIST_FILE);

  this.all = function(req, res) {
    setlistRepo.all(function(data){
      res.json(data);
    });
  };

  this.byTags = function (req, res){

    var tags = req.body;

    if(!tags || tags.length === 0){
      setlistRepo.all(function(data){
        res.json(data);
      });

      return;
    }

    setlistRepo.filter(function(song){
      var ok = true;
      for (var i = 0; i < tags.length; i++) {
        ok = ok && (song.tags.indexOf(tags[i]) > -1);
      }
      return ok;
    }, function(filteredData){
      res.json(filteredData);
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
