var createStore = require('redux').createStore;

var initialSongs = [
    {
        id: 1388534400000,
        artist: "krushing demons",
        song: "i came to chew gum and krush demons, and i'm all out of gum",
        tags: [
            "autoral",
            "2010's",
            "thrash metal"
        ]
    },
    {
        id: 1420070400000,
        artist: "Queen",
        song: "The show must go on",
        tags: [
            "cover",
            "80's",
            "classic rock"
        ]
    }
  ];

var initialState = {
  selectedSong: 1388534400000,
  songs: initialSongs
};


var ADD_SONG = 'ADD_SONG';
var SELECT_SONG = 'SELECT_SONG';

function addSong(artist, song, tags) {
  return { type: ADD_SONG, artist: artist, song: song, tags: tags };
}

function selectSong(id){
 return { type: SELECT_SONG, id:id } 
}


function setlistReducer(state, action) {
  switch (action.type) {
    case SELECT_SONG:
      return Object.assign({}, state, {
        selectedSong: action.id
      });
    case ADD_SONG:
      var newSongList = state.songs.concat({
            artist: action.artist,
            song: action.song,
            tags: action.tags
          });

      return Object.assign({}, state, {
          songs: newSongList 
      });    
    default:
      return state;
  }
}

module.exports = {
  store: createStore(setlistReducer, initialState),
  actions: {
    addSong: addSong,
    selectSong: selectSong,
  }
};
// console.log(store.getState());

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// var unsubscribe = store.subscribe(function() {
//   console.log(store.getState());
// });

// // Dispatch some actions
// store.dispatch(addSong('Muse', 'Uprising', ['indie', 'alternative']));
// store.dispatch(addSong('Nightwish', 'The Phantom of the Opera', ['gothic', 'metal']));
// store.dispatch(selectSong(1420070400000));

// // Stop listening to state updates
// unsubscribe();