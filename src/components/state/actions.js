var redux = require('redux');
var SongFactory = require('../../api/model/song');
var actionFactory = require('./actionFactory');

module.exports = {
  
  // cleans the selectedSong and the editingSong
  newSong: actionFactory.cleanAction(
    
    'NEW_SONG',  
    function(state, action){
      console.log(action.type);
      return {
        editingSong: {},
        selectedSong: undefined
      };
    }

  ),

  // creates a new song or updates an existing one
  saveSong: actionFactory.action(

    'SAVE_SONG', ['artist', 'song', 'tags'],
    function(state, action){

      console.log(action.type);
      console.log('Selected Song: ' + state.selectedSong);

      var songId = state.selectedSong ? state.selectedSong : Date.now();
      var song = SongFactory.fromSongishAndId(songId, action);

      console.dir(song);

      if(state.selectedSong)
      {
        var newStateData = state.data.map(function(s){
          if(s.id === state.selectedSong)
          {
            console.log('Updating song: ' + s.artist + ' - ' + s.song);
            return song;
          }

          return s;
        }); 

        return {
          data: newStateData,
          selectedSong: song.id,
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

  ),


  // given an id, it gets the corresponding song in state.data
  selectSong: actionFactory.action(

    'SELECT_SONG', ['id'], 
    function(state, action){
      console.log(action.type + ' - ' + action.id);

      var editingSong = state.data.find(function(song){ 
          return song.id === action.id; 
      });

      return {
        editingSong: editingSong ? editingSong : {},
        selectedSong: editingSong ? action.id : undefined
      };
    }
  ),

  // updates the song being edited as the user types in the form
  changeEditingSong: actionFactory.action(
  
    'CHANGE_EDITING_SONG', ['artist', 'song', 'tags'],
    function (state, action){
      
      console.log('Changing the song being edited: ' + action.artist + ' - ' + action.song);

      return { editingSong: SongFactory.fromSongish(action) };
    }
  )
};