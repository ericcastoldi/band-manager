var redux = require('redux');

var SELECT_SONG = 'SELECT_SONG';
function selectSongAction(id){
  return { type: SELECT_SONG, id: id };
}
function selectSongReducer(state, action){
  console.log(action.type + ' - ' + action.id);

    var editingSong = state.data.find(function(song){ 
        return song.id == action.id; 
    });

    return {
      data: state.data,
      editingSong: editingSong ? editingSong : {},
      selectedSong: action.id
    }
}
var selectSong = {
  type: SELECT_SONG,
  creator: selectSongAction,
  reducer: selectSongReducer
};

var NEW_SONG = 'NEW_SONG';
function newSongAction(){
  return { type: NEW_SONG };
}
function newSongReducer(state, action){
  console.log(action.type);

    // returns state without 'selectedSong'
    var newState = {
      data: state.data,
      editingSong: {}
    };

    return newState;
}
var newSong = {
  type: NEW_SONG,
  creator: newSongAction,
  reducer: newSongReducer
};


var CHANGE_EDITING_SONG = 'CHANGE_EDITING_SONG';
function changeEditingSongAction(song) {
  return { type: CHANGE_EDITING_SONG, artist: song.artist, tags:song.tags, song: song.song };
}
function changeEditingSongReducer(state, action){
  console.log('Changing the song being edited: ' + action.artist + ' - ' + action.song);

    var song = {
      artist: action.artist, 
      song: action.song, 
      tags: action.tags
    };
    return Object.assign({}, state, {
      editingSong: song
    });
}
var changeEditingSong = {
  type: CHANGE_EDITING_SONG,
  creator: changeEditingSongAction,
  reducer: changeEditingSongReducer
};


var SAVE_SONG = 'SAVE_SONG';
function saveSongAction(artist, song, tags){
  return { 
    type: SAVE_SONG,
    artist: artist, 
    song: song, 
    tags: tags
  };
}
function saveSongReducer(state, action){
    console.log(action.type);
    console.dir(action);
    console.log('Selected Song: ' + state.selectedSong);
    var songId = state.selectedSong ? state.selectedSong : Date.now();

    var song = {
      id: songId,
      artist: action.artist, 
      song: action.song, 
      tags: action.tags
    }

    console.dir(song);

    if(state.selectedSong)
    {
      var newStateData = state.data.map(function(s){
        if(s.id == state.selectedSong)
        {
          console.log('Updating song: ' + s.artist + ' - ' + s.song);
          return song;
        }

        return s;
      }); 

      return {
        data: newStateData,
        selectedSong: songId,
        editingSong: song
      };
    }

    console.log('Creating song: ' + song.artist + ' - ' + song.song);
    return {
      data: state.data.concat(song),
      selectedSong: songId,
      editingSong: song
    };
}
var saveSong = {
  type: SAVE_SONG,
  creator: saveSongAction,
  reducer: saveSongReducer
};

module.exports = {
  newSong: newSong,
  saveSong: saveSong,
  selectSong: selectSong,
  changeEditingSong: changeEditingSong
};