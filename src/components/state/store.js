var initialState = require('./initialState');
var createStore = require('redux').createStore;
var actionFactory = require('./actionFactory');
var rootReducer = actionFactory.rootReducer(require('./actions'));

module.exports = createStore(rootReducer, initialState);
