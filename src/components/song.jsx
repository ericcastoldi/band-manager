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
Song.propTypes = {
  artist: React.PropTypes.string,
  song: React.PropTypes.string.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.string)
}


module.exports = Song;