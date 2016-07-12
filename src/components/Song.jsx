var React = require('react');

var Song = React.createClass({
  propTypes: {
    artist: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  render: function() {
    var tags = [];
    var renderableTags = tags.concat(this.props.tags).join(', ');

    return (
      <div className="song">
        <em>{this.props.artist} - {this.props.name}</em>
        <small>{renderableTags}</small>
      </div>
    );
  }
});

module.exports = Song;
