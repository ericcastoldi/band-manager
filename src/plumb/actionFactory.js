// type: 'ACTION_IDENTIFIER'
// actionArgs: [ 'name', 'of', 'the', 'action', 'args' ]
var actionCreator = function(type, argNames){
      return function(){

          var action = {  };

          if(argNames){
              var args = arguments;
              argNames.forEach(function(argName, index) { 
                  action[argName] = args[index]; 
              });
          }

          action.type = type;

          return action;

      };
  }

  var safeReducer = function(reducer){
    return function(state, action){
        if(reducer && action.type === type){
            var change = reducer(state, action);
            return Object.assign({}, state, change);
        }

        return state;
      };
  }



var actionFactory =  {

  
  cleanAction: function(type, reducer){
    return {
        type: type,
        creator: actionCreator(type, undefined),
        reducer: safeReducer(reducer)
    };
  },

  action: function(type, argNames, reducer){

      return {
          type: type,
          creator: actionCreator(type, argNames),
          reducer: safeReducer(reducer)
      };

  }
};

module.exports = {
  action: actionFactory.action,
  cleanAction: actionFactory.cleanAction,
};

// var changeEditingSong = actionFactory('CHANGE_EDITING_SONG', ['artist', 'song', 'tags'], function(state, action){
//     console.log('Changing the song being edited: ' + action.artist + ' - ' + action.song);

//     var song = {
//       artist: action.artist, 
//       song: action.song, 
//       tags: action.tags
//     };

//     return Object.assign({}, state, {
//       editingSong: song
//     });
// });








// var ActionFactory = {
//   createAction: function(type, creatorParams, reducer) {

//     var actionCreator = { type: type };

//     var defaultCreator = function () { return { type: type } };
//     actionCreator.creator = defaultCreator;


//     if (creatorParams){
//       var parameters = [].concat(creatorParams);
//       var assignments = ['type: \'' + type + '\'' ];
      
//       var func = 'function actionCreator(';
      
//       parameters.forEach(function a(par){ 
//         func += par + ', '; 
//         assignments.push(', ' + par + ':' + par);
//       });

//       func = func.substring(0, func.length - 2) + ') { ';
//       func += 'return {';
//       assignments.forEach(function(assign){
//         func += assign;
//       });

//       func += '}; }';
//       func = 'var customActionCreator = ' + func;
//       eval(func);
//       actionCreator.creator = customActionCreator;
//     }

//     if(reducer){
//       actionCreator.reducer = reducer;
//     }
//     else{
//       actionCreator.reducer = function (state, action) {
//         if(state){return state;}
//         return {};
//       }
//     }
    
//     return actionCreator;
//   }
// };

