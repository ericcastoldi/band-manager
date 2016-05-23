var React = require('react');
var SongManagement = require('./SongManagement.jsx');
var Provider = require('react-redux').Provider;
var store = require('./state/store');

var Band = React.createClass({
  render: function() {
      return (
        <Provider store={store}>
        <div>
          <h1>{ this.props.children }</h1>

          <SongManagement />

        </div>
        </Provider>
  )}
});

Band.propTypes = {
  children: React.PropTypes.node.isRequired
}

module.exports = Band;
