var songs = [
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
      },
      {
          id: 1458882345512,
          artist: "Gorillaz",
          song: "Clint Eastwood",
          tags: [
              "cover",
              "2000's",
              "alternative"
            ]
      },
      {
          id: 1458882373879,
          artist: "Linkin Park",
          song: "Numb",
          tags: [
              "cover",
              "2000's",
              "nu-metal"
          ]
      }
    ];

var initialState = {

  // The song object being edited in the SongForm
  editingSong: {},

  // The SongList's selected song id
  selectedSong: undefined,

  // Are we fetching some songs right now?
  fetchingSongs: false,

  // Do we had any errors fetching the songs?
  errorFetchingSongs: false,

  // All the songs!!!
  data: [ songs[0], songs[1] ]

};


module.exports = initialState;