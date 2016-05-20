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

var safeReducer = function(type, reducer){
  return function(state, action){

      console.log(action);

      if(reducer && action.type === type){
          var change = Object.assign({}, reducer(state, action));
          return Object.assign({}, state, change);
      }

      return state;
    };
}



module.exports  =  {
  
  cleanAction: function(type, reducer){
    return {
        type: type,
        creator: actionCreator(type, undefined),
        reducer: safeReducer(type, reducer)
    };
  },

  action: function(type, argNames, reducer){

      return {
          type: type,
          creator: actionCreator(type, argNames),
          reducer: safeReducer(type, reducer)
      };
  },

  complexAction: function(type, creator, reducer){
    return {
          type: type,
          creator: creator,
          reducer: safeReducer(type, reducer)
      };
  },

  rootReducer: function (actions){
    return function(state, action){
  
      if(!state){
        state = initialState;
      }

      var newState;

      Object.keys(actions).forEach(function(actionKey){
        if(action.type === actions[actionKey].type){
          newState = actions[actionKey].reducer(state, action);
        }
      });

      return newState ? newState : state;
    };
  }
};

// module.exports = {
//   action: actionFactory.action,
//   cleanAction: actionFactory.cleanAction,
//   rootReducer: actionFactory.rootReducer
// };
