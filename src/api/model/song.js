var emptySong = {
	id:undefined, 
	artist:undefined, 
	name:undefined, 
	tags: []
};

var empty = function(){
  return Object.assign({}, emptySong);
};

var createSong = function(artist, name, tags, id){

  if(!name) throw new Error('Song must have a name.');

  var song = {
    name:name
  };

  if(id){
    song.id = id;
  }

  if(artist){
    song.artist = artist;
  }

  if(tags){
    song.tags = tags;
  }

  return Object.assign({}, song);
}


var fromSongishAndId = function(id, songish) {
  if(!songish) throw new Error('There\'s no songish.');
  var song = Object.assign({}, songish);
  return createSong(song.artist, song.name, song.tags, id);
}

var fromSongish = function(songish){
  if(!songish) throw new Error('There\'s no songish.');
  var song = Object.assign({}, songish);
  var id = song.id ? song.id : Date.now();
  return createSong(song.artist, song.name, song.tags, id);
}

var queryById = function(id) {
  var where = function(song){
    return song.id === id;
  };

  return where;
}

module.exports = {
	empty: empty,
	createSong : createSong,
	fromSongish : fromSongish,
	fromSongishAndId: fromSongishAndId,
  createQueryById: queryById
};