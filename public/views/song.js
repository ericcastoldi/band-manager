var Song = React.createClass({
  displayName: "Song",

  render: function () {
    return React.createElement(
      "div",
      { className: "song" },
      React.createElement(
        "em",
        null,
        this.props.artist,
        " - ",
        this.props.song
      ),
      React.createElement("br", null),
      React.createElement(
        "small",
        null,
        this.props.tags
      )
    );
  }
});