var initialState = require('./initialState');
var createStore = require('redux').createStore;
var rootReducer = require('./actionFactory').rootReducer(require('./actions'));

module.exports = createStore(rootReducer, initialState);
