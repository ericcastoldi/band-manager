var thunkMiddleware = require('redux-thunk').default;
var createLogger = require('redux-logger');

var initialState = require('./initialState');
var redux = require('redux');
var actionFactory = require('./actionFactory');
var rootReducer = actionFactory.rootReducer(require('./actions'));

var loggerMiddleware = createLogger();

module.exports = redux.createStore(

	rootReducer,

	initialState,

	redux.applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);
