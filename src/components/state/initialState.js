var initialState = {

  filteredTags: [],

  // The song object being edited in the SongForm
  editingSong: {},

  // The SongList's selected song id
  selectedSong: undefined,

  // Are we fetching some songs right now?
  fetchingSongs: false,

  // Do we had any errors fetching the songs?
  errorFetchingSongs: false,

  // Are we saving a song right now?
  savingSong: false,

  // Do we had any errors saving the song?
  errorSavingSong: false,

  // All the songs!!!
  data: [ ]

};

module.exports = initialState;
