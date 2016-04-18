var Repository = require('./repository');

var SETLIST_FILE = 'src/data/setlist.json';

var withRepo = function(action){
	var setlistRepo = new Repository(SETLIST_FILE);
	action(setlistRepo);
}

exports.all = function(req, res) {
	withRepo(function(setlistRepo){
		setlistRepo.all(function(data){
	    	res.json(data);
	  	});
  	});
}

exports.save = function(req, res) {
  var newSong = {
      id: Date.now(),
      artist: req.body.artist,
      song: req.body.song,
      tags: req.body.tags,
  };

  withRepo(function(setlistRepo){
  	setlistRepo.add(newMember, function(data){
    	res.json(data);
  	});
  });

}