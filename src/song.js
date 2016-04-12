var Song = React.createClass({
  render: function() {
    return (
      <div className="song">
        <em>{this.props.artist} - {this.props.song}</em>
        <br />
        <small>{this.props.tags}</small>
      </div>
    );
  }
});