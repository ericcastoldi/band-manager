// var initialState = require('./initialState');
// var actions = require('./actions');

// var rootReducer = function(state, action){
	
// 	if(!state){
// 		state = initialState;
// 	}

// 	var newState = undefined;
// 	Object.keys(actions).forEach(function(actionKey){
// 		if(action.type === actions[actionKey].type){
// 			newState = actions[actionKey].reducer(state, action);
// 		}
// 	});

// 	return newState ? newState : state;
// };
	
// 	// switch(action.type){
// 	// 	case actions.newSong.type:
// 	// 		return actions.newSong.reducer(state, action);
// 	// 	case actions.saveSong.type:
// 	// 		return actions.saveSong.reducer(state, action);
// 	// 	case actions.selectSong.type:
// 	// 		return actions.selectSong.reducer(state, action);
// 	// 	case actions.changeEditingSong.type:
// 	// 		return actions.changeEditingSong.reducer(state, action);
// 	// 	default:
// 	// 		return state;
// 	// }


// module.exports = rootReducer;