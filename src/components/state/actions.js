var songFactory = require('../../api/model/songFactory');
var actionFactory = require('./actionFactory');
var axios = require('axios');

/*
type
creator
reducer
*/

var actions = {

  // cleans the selectedSong and the editingSong
  newSong: actionFactory.cleanAction(

    'NEW_SONG',
    function (state, action) {
      return {
        editingSong: {},
        selectedSong: undefined
      };
    }

  ),

  // given an id, it gets the corresponding song in state.data
  selectSong: actionFactory.action(

    'SELECT_SONG', ['id'],
    function (state, action) {

      var editingSong = state.data.find(songFactory.createQueryById(action.id));

      return {
        editingSong: editingSong ? editingSong : {},
        selectedSong: editingSong ? action.id : undefined
      };
    }
  ),

  // updates the song being edited as the user types in the form
  changeEditingSong: actionFactory.action(

    'CHANGE_EDITING_SONG', ['artist', 'name', 'tags', 'id'],
    function (state, action) {
      return {
        editingSong: songFactory.fromPartialSongish(action)
      };
    }
  ),



  requestSongs: actionFactory.cleanAction(
    'REQUEST_SONGS',
    function (state, action) {
      return {
        errorFetchingSongs: false,
        fetchingSongs: true
      };
    }
  ),

  receiveSongs: actionFactory.action(
    'RECEIVE_SONGS', ['response'],
    function (state, action) {
      return {
        data: action.response,
        fetchingSongs: false,
        filteredTags: []
      };
    }
  ),

  cannotReceiveSongs: actionFactory.action(
    'CANNOT_RECEIVE_SONGS', ['error'],
    function (state, action) {
      return {
        errorFetchingSongs: true,
        fetchingSongs: false
      };
    }
  ),


  startSavingSong: actionFactory.cleanAction(
    'START_SAVING_SONG',
    function (state, action) {
      return {
        errorSavingSong: false,
        savingSong: true
      };
    }
  ),

  doneSavingSong: actionFactory.cleanAction(
    'DONE_SAVING_SONG',
    function (state, action) {
      return {
        errorSavingSong: false,
        savingSong: false
      };
    }
  ),

  cannotSaveSong: actionFactory.cleanAction(
    'CANNOT_SAVE_SONG',
    function (state, action) {
      return {
        errorSavingSong: true,
        savingSong: false
      };
    }
  ),

  changeFilteredTags: actionFactory.action(

    'CHANGE_FILTERED_TAGS', ['tags'],

    function (state, action) {
      return {
        filteredTags: action.tags
      };
    }
  ),

  requestFilteredSongs: actionFactory.cleanAction(
    'REQUEST_FILTERED_SONGS',
    function (state, action) {
      return {
        errorFetchingSongs: false,
        fetchingSongs: true
      };
    }
  ),

  receiveFilteredSongs: actionFactory.action(
    'RECEIVE_FILTERED_SONGS', ['response'],
    function (state, action) {
      return {
        data: action.response,
        fetchingSongs: false
      };
    }
  )
};

// async
actions.filterSongs = actionFactory.complexAction(

  'FILTER_SONGS',

  function (tags) {
    return function (dispatch) {

      dispatch(actions.requestFilteredSongs.creator());

      return axios.post('/api/filterSetlist', tags)
        .then(function (response) {
          dispatch(actions.receiveFilteredSongs.creator(response.data));
        })
        .catch(function (response) {
          dispatch(actions.cannotReceiveSongs.creator());
        });
    };
  }
);

actions.fetchSongs = actionFactory.complexAction(

  'FETCH_SONGS',

  // action creator
  function () {

    // async
    return function (dispatch) {

      dispatch(actions.requestSongs.creator());

      return axios.get('/api/setlist')
        .then(function (response) {
          dispatch(actions.receiveSongs.creator(response.data));
        })
        .catch(function (response) {
          dispatch(actions.cannotReceiveSongs.creator());
        });


    };
  },

  // reducer
  function (state, action) {
    return state;
  }

);

// creates a new song or updates an existing one
actions.saveSong = actionFactory.complexAction(

  'SAVE_SONG',

  // action creator
  function (artist, songName, tags, id) {

    // async
    return function (dispatch) {
      dispatch(actions.startSavingSong.creator());

      var song = songFactory.createSong(artist, songName, tags, id);

      return axios.post('/api/setlist', song)
        .then(function (response) {
          dispatch(actions.doneSavingSong.creator());
          dispatch(actions.receiveSongs.creator(response.data));
        })
        .catch(function (response) {
          dispatch(actions.cannotSaveSong.creator());
        });

    };
  },

  // reducer
  function (state, action) {
    return state;
  }
);

module.exports = actions;
