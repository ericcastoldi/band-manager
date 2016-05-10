var initialState = require('./initialState');
var actions = require('./actions');

var rootReducer = function(state, action){
	if(!state){
		state = initialState;
	}

	switch(action.type){
		case actions.newSong.type:
			return actions.newSong.reducer(state, action);
		case actions.saveSong.type:
			return actions.saveSong.reducer(state, action);
		case actions.selectSong.type:
			return actions.selectSong.reducer(state, action);
		case actions.changeEditingSong.type:
			return actions.changeEditingSong.reducer(state, action);
		default:
			return state;
	}
}

module.exports = rootReducer;