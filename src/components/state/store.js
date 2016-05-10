var createStore = require('redux').createStore;
var rootReducer = require('./rootReducer');
var initialState = require('./initialState');

var store = createStore(rootReducer, initialState);
module.exports = store;