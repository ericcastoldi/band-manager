var emptySong = {
	id: undefined,
	artist: undefined,
	name: undefined,
	tags: []
};

var empty = function(){
  return Object.assign({}, emptySong);
};

var createPartialSong = function(artist, name, tags, id){
	var song = Object.assign({}, emptySong);

	if(name){
    song.name = name;
	}

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
};

var createSong = function(artist, name, tags, id){
  if(!name) { throw new Error('Song must have a name.'); }
	return createPartialSong(artist, name, tags, id);
};

var defineId = function(songish){
	return songish.id ? songish.id : Date.now();
};


var fromSongishAndId = function(id, songish) {
  if(!songish) { throw new Error('There\'s no songish.'); }
  return createSong(songish.artist, songish.name, songish.tags, id);
};

var fromSongish = function(songish){
  if(!songish) { throw new Error('There\'s no songish.'); }
  return createSong(songish.artist, songish.name, songish.tags, defineId(songish));
};

var fromPartialSongish = function(songish){
  if(!songish) { throw new Error('There\'s no songish.'); }
  return createPartialSong(songish.artist, songish.name, songish.tags, defineId(songish));
};

var queryById = function(id) {
  return function(song){
    return song.id === id;
  };
};

module.exports = {
	empty: empty,
	createSong: createSong,
	fromSongish: fromSongish,
	fromSongishAndId: fromSongishAndId,
	fromPartialSongish: fromPartialSongish,
  createQueryById: queryById
};
