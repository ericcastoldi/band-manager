var redux = require('redux');
var SongFactory = require('../../api/model/song');
var actionFactory = require('./actionFactory');
var axios = require('axios');

var actions = {
  
  // cleans the selectedSong and the editingSong
  newSong: actionFactory.cleanAction(
    
    'NEW_SONG',  
    function(state, action){
      return {
        editingSong: {},
        selectedSong: undefined
      };
    }

  ),

  // creates a new song or updates an existing one
  // saveSong: actionFactory.action(

  //   'SAVE_SONG', ['artist', 'song', 'tags'],
  //   function(state, action){

  //     console.log('Selected Song: ' + state.selectedSong);

  //     var songId = state.selectedSong ? state.selectedSong : Date.now();
  //     var song = SongFactory.fromSongishAndId(songId, action);

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
  //         selectedSong: song.id,
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

  // ),


  // given an id, it gets the corresponding song in state.data
  selectSong: actionFactory.action(

    'SELECT_SONG', ['id'], 
    function(state, action){

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
  
    'CHANGE_EDITING_SONG', ['artist', 'song', 'tags', 'id'],
    function (state, action){
      return { editingSong: SongFactory.fromSongish(action) };
    }
  ),

  

  requestSongs: actionFactory.cleanAction(
    'REQUEST_SONGS',
    function(state, action){
      return {
        errorFetchingSongs: false,
        fetchingSongs: true
      };
    }
  ),

  receiveSongs: actionFactory.action(
    'RECEIVE_SONGS', ['response'],
    function(state, action){
      return {
        data: action.response,
        fetchingSongs: false
      };
    }
  ),

  cannotReceiveSongs: actionFactory.action(
    'CANNOT_RECEIVE_SONGS', ['error'],
    function(state, action){
      return {
        errorFetchingSongs: true,
        fetchingSongs: false
      };
    }
  ),


  startSavingSong: actionFactory.cleanAction(
    'START_SAVING_SONG',
    function(state, action){
      return {
        errorSavingSong: false,
        savingSong: true
      };
    }
  ),

  doneSavingSong: actionFactory.cleanAction(
    'DONE_SAVING_SONG',
    function(state, action){
      return {
        errorSavingSong: false,
        savingSong: false
      };
    }
  ),

  cannotSaveSong: actionFactory.cleanAction(
    'CANNOT_SAVE_SONG',
    function(state, action){
      return {
        errorSavingSong: true,
        savingSong: false
      };
    }
  )
};

// async
actions.fetchSongs = actionFactory.complexAction(

  'FETCH_SONGS',
  
  // action creator
  function(){
    
    // async
    return function(dispatch){

      dispatch(actions.requestSongs.creator());

      return axios.get('http://localhost:3000/api/setlist')
        .then(function(response){
          dispatch(actions.receiveSongs.creator(response.data));
        })
        .catch(function (response) {
          dispatch(actions.cannotSaveSong.creator());
        });  
      

    }
  },
  
  // reducer
  function(state, action){
    console.log("Started fetching...");
    return state;
  }

);

actions.saveSong = actionFactory.complexAction(

  'SAVE_SONG', 
  
  // action creator
  function(artist, songName, tags, id){
    
    // async
    return function(dispatch){
      dispatch(actions.startSavingSong.creator());

      var song = SongFactory.createSong(artist, songName, tags, id);

      return axios.post('http://localhost:3000/api/setlist', song)
        .then(function(response){
          dispatch(actions.doneSavingSong.creator());
          dispatch(actions.receiveSongs.creator(response.data));
        })
        .catch(function (response) {
          dispatch(actions.cannotReceiveSongs.creator());
        });  
      

    }
  },
  
  // reducer
  function(state, action){
    console.log("Started fetching...");
    return state;
  }
);
module.exports = actions;