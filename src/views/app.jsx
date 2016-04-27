var React = require('react');
var ReactDOM = require('react-dom');
var Band = require('./band.jsx')

ReactDOM.render(
  <Band url="http://localhost:3000/api/setlist">krushing demons</Band>,
  document.getElementById('content')
);
