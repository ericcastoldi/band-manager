var redux = require('redux');

var ActionFactory = {
  createAction: function(type, creatorParams, reducer) {

    var actionCreator = { type: type };

    var defaultCreator = function () { return { type: type } };
    actionCreator.creator = defaultCreator;


    if (creatorParams){
      var parameters = [].concat(creatorParams);
      var assignments = ['type: \'' + type + '\'' ];
      
      var func = 'function actionCreator(';
      
      parameters.forEach(function a(par){ 
        func += par + ', '; 
        assignments.push(', ' + par + ':' + par);
      });

      func = func.substring(0, func.length - 2) + ') { ';
      func += 'return {';
      assignments.forEach(function(assign){
        func += assign;
      });

      func += '}; }';
      func = 'var customActionCreator = ' + func;
      eval(func);
      actionCreator.creator = customActionCreator;
    }

    if(reducer){
      actionCreator.reducer = reducer;
    }
    else{
      actionCreator.reducer = function (state, action) {
        if(state){return state;}
        return {};
      }
    }
    
    return actionCreator;
  }
};

var SongFactory = {
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

var CHANGE_EDITING_SONG = 'CHANGE_EDITING_SONG';
var changeEditingSong = {
  
  type: CHANGE_EDITING_SONG,
  
  creator: function (song) {
    return { type: CHANGE_EDITING_SONG, artist: song.artist, tags:song.tags, song: song.song };
  },
  
  reducer: function (state, action){
    
    console.log('Changing the song being edited: ' + action.artist + ' - ' + action.song);

    var song = SongFactory.fromSongish(action);
    // var song = {
    //   artist: action.artist, 
    //   song: action.song, 
    //   tags: action.tags
    // };

    return Object.assign({}, state, {
      editingSong: song
    });
  }
};



var selectSong = ActionFactory.createAction('SELECT_SONG', ['id'], function(state, action){
  console.log(action.type + ' - ' + action.id);

  var editingSong = state.data.find(function(song){ 
      return song.id === action.id; 
  });

  return {
    data: state.data,
    editingSong: editingSong ? editingSong : {},
    selectedSong: action.id
  }
});



var newSong = ActionFactory.createAction('NEW_SONG', null, function(state, action){
  console.log(action.type + ' - ' + action.id);

  var editingSong = state.data.find(function(song){ 
      return song.id === action.id; 
  });

  return {
    data: state.data,
    editingSong: editingSong ? editingSong : {},
    selectedSong: action.id
  }
});




var saveSong = ActionFactory.createAction('SAVE_SONG', ['artist', 'song', 'tags'], function(state, action){
  console.log(action.type);
  console.log('Selected Song: ' + state.selectedSong);

  var songId = state.selectedSong ? state.selectedSong : Date.now();

  var song = SongFactory.createSong(action.artist, action.song, action.tags, songId)
  // var song = {
  //   id: songId,
  //   artist: action.artist, 
  //   song: action.song, 
  //   tags: action.tags
  // }

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

});




module.exports = {
  newSong: newSong,
  saveSong: saveSong,
  selectSong: selectSong,
  changeEditingSong: changeEditingSong
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
