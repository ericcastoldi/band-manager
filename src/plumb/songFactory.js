var SongFactory = {
  fromSongishAndId: function(id, songish){
    var song = fromSongish(songish);

    if(id) {
      song.id = id;
    }

    return song;
  },

  fromSongish: function(songish){
    var song = {id:undefined, artist:undefined, song:undefined, tags: []};
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
  },
  createSong: function(artist, songName, tags, id){
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
};

module.exports = SongFactory;