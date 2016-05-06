var React = require('react');

var SongForm = React.createClass({

  addSong: function(e){
    e.preventDefault();
    
    var song = this.props.song.trim();
    if (!song) {
      return;
    }

    var artist = this.props.artist.trim();
    var tags = this.props.tags.split(',').map(function(tag) {
      return tag.trim();
    });

    this.props.onNewSongAdded({artist: artist, song: song, tags: tags});
  },
  render: function(){
    
    var inputs = [
      { key: 'songform-artist', placeholder: 'Artista', value:this.props.artist },
      { key: 'songform-song', placeholder: 'Música', value:this.props.song },
      { key: 'songform-tags', placeholder: 'tags... 80s, rock, love songs, etc.', value:this.props.song.tags }
    ];

    var renderedInputs = inputs.map(function (input) {
      
      return (
        <input  type="text" 
                placeholder={input.placeholder}
                value={input.value}
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
SongForm.propTypes = {
  artist: React.PropTypes.string,
  song: React.PropTypes.string,
  tags: React.PropTypes.array,
  onNewSongAdded: React.PropTypes.func
}

module.exports = SongForm;
