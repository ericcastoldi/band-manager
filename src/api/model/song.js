var empty = {
	id:undefined, 
	artist:undefined, 
	song:undefined, 
	tags: []
};

var fromSongishAndId = function(id, songish) {
  var song = fromSongish(songish);

  if(id) {
    song.id = id;
  }

  return song;
}

var fromSongish = function(songish){
  var song = empty;
  
  if(!songish){
    return song;
  }

  if(songish.id){
    song.id = songish.id;
  }

  if(songish.artist){
    song.artist = songish.artist;
  }

  if(songish.song){
    song.song = songish.song;
  }

  if(songish.tags){
    song.tags = songish.tags;
  }

  return song;
}

var createSong = function(artist, songName, tags, id){
  var song = {
    artist: artist,
    song:songName,
    tags: tags
  };

  if(id){
    song.id = id;
  }

  return song;
}


module.exports = {
	empty: empty,
	createSong : createSong,
	fromSongish : fromSongish,
	fromSongishAndId: fromSongishAndId
};