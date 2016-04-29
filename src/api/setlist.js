function Setlist(){
  
  var Repository = require('./repository');
  var SETLIST_FILE = 'src/data/setlist.json';

  var setlistRepo = new Repository(SETLIST_FILE);


  this.all = function(req, res) {
    setlistRepo.all(function(data){
  	 	res.json(data);
  	});
  }

  this.save = function(req, res) {

    var song = createSong(req.body);

   	setlistRepo.add(song, function(data){
      res.json(data);
   	});
  }

  this.update = function(req, res) {

    var where = function(song){
      return song.id == req.body.id;
    }

    setlistRepo.update(createSong(req.body), where, function(data){
      res.json(data);
    });
  }

  var createSong = function (body){

    if(!body.song) throw new Error('Body must have a song.')

    return {
        id: body.id ? body.id : Date.now(),
        artist: body.artist,
        song: body.song,
        tags: body.tags
    };
  }
}

module.exports = new Setlist();