var redux = require('redux');
var SongFactory = require('../../plumb/songFactory');
var actionFactory = require('../../plumb/actionFactory');

// var StateController = {
//   applyChange: function(state, change){
//     return Object.assign({}, state, change);
//   }
// };


// var newSong = ActionFactory.createAction('NEW_SONG', null, function(state, action){
//   console.log(action.type);

//   return StateController.applyChange(state, {
//     editingSong: {},
//     selectedSong: undefined
//   });
// });

// var saveSong = ActionFactory.createAction('SAVE_SONG', ['artist', 'song', 'tags'], function(state, action){
//   console.log(action.type);
//   console.log('Selected Song: ' + state.selectedSong);

//   var songId = state.selectedSong ? state.selectedSong : Date.now();
//   var song = SongFactory.fromSongishAndId(songId, action);

//   console.dir(song);

//   if(state.selectedSong)
//   {
//     var newStateData = state.data.map(function(s){
//       if(s.id === state.selectedSong)
//       {
//         console.log('Updating song: ' + s.artist + ' - ' + s.song);
//         return song;
//       }

//       return s;
//     }); 

//     return {
//       data: newStateData,
//       selectedSong: song.id,
//       editingSong: song
//     };
//   }

//   console.log('Creating song: ' + song.artist + ' - ' + song.song);
//   return {
//     data: state.data.concat(song),
//     selectedSong: songId,
//     editingSong: song
//   };

// });


// var selectSong = ActionFactory.createAction('SELECT_SONG', ['id'], function(state, action){
//   console.log(action.type + ' - ' + action.id);

//   var editingSong = state.data.find(function(song){ 
//       return song.id === action.id; 
//   });

//   return StateController.applyChange(state, {
//     editingSong: editingSong ? editingSong : {},
//     selectedSong: action.id
//   });
// });




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


  changeEditingSong: actionFactory.action(
  
    'CHANGE_EDITING_SONG', ['artist', 'song', 'tags'],
    function (state, action){
      
      console.log('Changing the song being edited: ' + action.artist + ' - ' + action.song);

      return { editingSong: SongFactory.fromSongish(action) };
    }
  )
};

















// var SELECT_SONG = 'SELECT_SONG';
// var selectSong = {
 
//   type: SELECT_SONG,
 
//   creator: function (id) {
//     return { type: SELECT_SONG, id: id };
//   },
 
//   reducer: function (state, action) {

//     console.log(action.type + ' - ' + action.id);

//     var editingSong = state.data.find(function(song){ 
//         return song.id === action.id; 
//     });

//     return {
//       data: state.data,
//       editingSong: editingSong ? editingSong : {},
//       selectedSong: action.id
//     }
//   }

// };

// var NEW_SONG = 'NEW_SONG';
// var newSong = {
 
//   type: NEW_SONG,
 
//   creator: function () {
//     return { type: NEW_SONG };
//   },

//   reducer: function (state, action){
  
//     console.log(action.type);

//     // returns state without 'selectedSong'
//     var newState = {
//       data: state.data,
//       editingSong: {}
//     };

//     return newState;
//   }

// };
// var SAVE_SONG = 'SAVE_SONG';
// var saveSong = {
  
//   type: SAVE_SONG,

//   creator: function (artist, song, tags){
//     return { 
//       type: SAVE_SONG,
//       artist: artist, 
//       song: song, 
//       tags: tags
//     };
//   },
  
//   reducer: function (state, action){

//     console.log(action.type);
//     console.log('Selected Song: ' + state.selectedSong);

//     var songId = state.selectedSong ? state.selectedSong : Date.now();

//     var song = {
//       id: songId,
//       artist: action.artist, 
//       song: action.song, 
//       tags: action.tags
//     }

//     console.dir(song);

//     if(state.selectedSong)
//     {
//       var newStateData = state.data.map(function(s){
//         if(s.id === state.selectedSong)
//         {
//           console.log('Updating song: ' + s.artist + ' - ' + s.song);
//           return song;
//         }

//         return s;
//       }); 

//       return {
//         data: newStateData,
//         selectedSong: songId,
//         editingSong: song
//       };
//     }

//     console.log('Creating song: ' + song.artist + ' - ' + song.song);
//     return {
//       data: state.data.concat(song),
//       selectedSong: songId,
//       editingSong: song
//     };
//   }

// };
