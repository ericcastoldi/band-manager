var Setlist = React.createClass({
  displayName: "Setlist",

  render: function () {
    var songs = this.props.data.map(function (song) {

      return React.createElement(
        "li",
        null,
        React.createElement(Song, { artist: song.artist, song: song.song, tags: song.tags.join(', ') })
      );
    });

    return React.createElement(
      "ul",
      { className: "setlist" },
      songs
    );
  }
});