var thunkMiddleware = require('redux-thunk').default;
var createLogger = require('redux-logger');

var initialState = require('./initialState');
var redux = require('redux');
var actionFactory = require('./actionFactory');
var rootReducer = actionFactory.rootReducer(require('./actions'));

var loggerMiddleware = createLogger();

var store = redux.createStore(

	rootReducer,

	initialState,
	redux.compose(
		redux.applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		),
		window.devToolsExtension ? window.devToolsExtension() : function(f) {return f; }
	)
);

if (module.onReload) {
    module.onReload(() => {

      store.replaceReducer(rootReducer.default || rootReducer);

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true;
    });
}

module.exports = store;
