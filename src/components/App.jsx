var React = require('react');
var ReactDOM = require('react-dom');
var store = require('./state/store');
var Provider = require('react-redux').Provider;
var Band = require('./Band.jsx');


ReactDOM.render(
	
  <Provider store={store}>
   	<Band>krushing demons</Band>
  </Provider>,

  document.getElementById('app')

);

