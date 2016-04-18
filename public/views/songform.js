var SongForm = React.createClass({
  displayName: 'SongForm',

  getInitialState: function () {
    return {
      artist: '',
      song: '',
      tags: ''
    };
  },
  artistChanged: function (e) {
    this.setState({ artist: e.target.value });
  },
  songChanged: function (e) {
    this.setState({ song: e.target.value });
  },
  tagsChanged: function (e) {
    this.setState({ tags: e.target.value });
  },
  addSong: function (e) {
    e.preventDefault();

    var song = this.state.song.trim();
    if (!song) {
      return;
    }

    var artist = this.state.artist.trim();
    var tags = this.state.tags.split(',').map(function (tag) {
      return tag.trim();
    });

    this.props.onNewSongAdded({ artist: artist, song: song, tags: tags });

    this.setState(this.getInitialState());
  },
  render: function () {
    return React.createElement(
      'form',
      { className: 'songform', onSubmit: this.addSong },
      React.createElement('input', { type: 'text',
        placeholder: 'Artista...',
        value: this.state.artist,
        onChange: this.artistChanged
      }),
      React.createElement('input', { type: 'text',
        placeholder: 'Música...',
        value: this.state.song,
        onChange: this.songChanged
      }),
      React.createElement('input', { type: 'text',
        placeholder: 'tags... 80s, rock, love songs, etc.',
        value: this.state.tags,
        onChange: this.tagsChanged
      }),
      React.createElement('input', { type: 'submit', value: 'Adicionar' })
    );
  }
});