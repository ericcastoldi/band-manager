var React = require('react');
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;
var Provider = require('react-redux').Provider;
var Setlist = require('./setlist.jsx');
var SongForm = require('./songform.jsx');

var initialState = {
	//selectedSong: 1388534400000,
	editingSong: {},
	data: [
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
  	]
};

var SELECT_SONG = 'SELECT_SONG';
function selectSong(id){
  return { type: SELECT_SONG, id: id };
}

var NEW_SONG = 'NEW_SONG';
function newSong(){
  return { type: NEW_SONG };
}

var CHANGE_EDITING_SONG = 'CHANGE_EDITING_SONG';
function changeEditingSong(song) {
	return { type: CHANGE_EDITING_SONG, artist: song.artist, tags:song.tags, song: song.song };
}

var SAVE_SONG = 'SAVE_SONG';
function saveSong(artist, song, tags){
  return { 
  	type: SAVE_SONG,
  	artist: artist, 
  	song: song, 
  	tags: tags
  };
}

function reducer(state, action) {
	if(action.type == SELECT_SONG) {
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

	if(action.type == NEW_SONG) {
		console.log(action.type);

		// returns state without 'selectedSong'
		var newState = {
			data: state.data,
			editingSong: {}
		};

		return newState;
	}

	if(action.type == SAVE_SONG) {
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
				selectedSong: songId
			};
		}

		console.log('Creating song: ' + song.artist + ' - ' + song.song);
		return {
			data: state.data.concat(song),
			selectedSong: songId
		};
		
		
	}

	return state;
}

var store = createStore(reducer, initialState);

function mapSongFormStateToProps(state) {
	  return {
	    artist: state.editingSong.artist,
	    song: state.editingSong.song,
	    tags: state.editingSong.tags
	  }
}

function mapSongFormDispatchToProps(dispatch) {
  return bindActionCreators({newSong: newSong, saveSong: saveSong, changeEditingSong: changeEditingSong}, dispatch)
}

function mapSetlistStateToProps(state){
  return {
  	selectedSong: state.selectedSong,
  	data: state.data
  }	
}

function mapSetlistDispatchToProps(dispatch){
  return bindActionCreators({selectSong: selectSong}, dispatch)
}


//var Song = connect(mapSongStateToProps, mapSongDispatchToProps)(Song);
var Setlist = connect(mapSetlistStateToProps, mapSetlistDispatchToProps)(Setlist);
var SongForm = connect(mapSongFormStateToProps, mapSongFormDispatchToProps)(SongForm);

var Band = React.createClass({
	render: function() {
	    return (
	      <div className="band">
	        <h1>{ this.props.children }</h1>
	        
	        <Setlist />
	        <SongForm />

	      </div>
	)}
});


ReactDOM.render(
	
	<Provider store={store}>
    	<Band>krushing demons</Band>
  	</Provider>,

  	document.getElementById('content')

);

