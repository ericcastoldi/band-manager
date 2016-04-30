var React = require('react');

var SongForm = React.createClass({
  getInitialState : function() {
      return {
          artist: '',
          song: '',
          tags: '' 
      };
  },
  artistChanged: function (e) {
    //this.setState({artist: e.target.value});
    var song = this.props.song;
    song.artist = e.target.value;
    this.props.songChanged(song);
  },
  songChanged: function (e) {
    //this.setState({song: e.target.value});
    var song = this.props.song;
    song.song = e.target.value;
    this.props.songChanged(song);
  },
  tagsChanged: function (e) {
    var song = this.props.song;
    song.tags = e.target.value;
    this.props.songChanged(song);
  },
  addSong: function(e){
    e.preventDefault();
    
    var song = this.state.song.trim();
    if (!song) {
      return;
    }

    var artist = this.state.artist.trim();
    var tags = this.state.tags.split(',').map(function(tag) {
      return tag.trim();
    });

    this.props.onNewSongAdded({artist: artist, song: song, tags: tags});
    
    this.setState(this.getInitialState());
  },
  render: function(){
    
    var inputs = [
      { key: 'songform-artist', placeholder: 'Artista', value:this.props.song.artist, changed:this.artistChanged },
      { key: 'songform-song', placeholder: 'Música', value:this.props.song.song, changed: this.songChanged},
      { key: 'songform-tags', placeholder: 'tags... 80s, rock, love songs, etc.', value:this.props.song.tags, changed: this.tagsChanged}
    ];

    var renderedInputs = inputs.map(function (input) {
      
      return (
        <input  type="text" 
                placeholder={input.placeholder}
                value={input.value}
                onChange={input.changed}
                key={input.key}
                />
      );

    });

    return (
      <form className="songform" onSubmit={this.addSong}>
        
        { renderedInputs }

        <input type="submit" value="Adicionar" className="button-primary" />

      </form>
    );
  }
});

module.exports = SongForm;
