var React = require('react');

var Song = React.createClass({
  render: function() {
    return (
      <div className="song">
        <em>{this.props.artist} - {this.props.song}</em>
        <small>{this.props.tags}</small>
      </div>
    );
  }
});

module.exports = Song;