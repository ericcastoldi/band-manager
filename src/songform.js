var SongForm = React.createClass({
  getInitialState : function() {
      return {
          artist: '',
          song: '',
          tags: '' 
      };
  },
  artistChanged: function (e) {
    this.setState({artist: e.target.value});
  },
  songChanged: function (e) {
    this.setState({song: e.target.value});
  },
  tagsChanged: function (e) {
    this.setState({tags: e.target.value});
  },
  addSong: function(e){
    e.preventDefault();
    
    var song = this.state.song.trim();
    if (!song) {
      return;
    }

    var artist = this.state.artist.trim();
    var tags = this.state.tags.trim();

    // TODO: send request to the server
    this.setState(this.getInitialState());
  },
  render: function(){
    return (
      <form className="songform" onSubmit={this.addSong}>
        
        <input  type="text" 
                placeholder="Artista..." 
                value={this.state.artist}
                onChange={this.artistChanged}
                />

        <input type="text" 
               placeholder="Música..." 
               value={this.state.song}
               onChange={this.songChanged}
               />

        <input  type="text" 
                placeholder="tags... 80s, rock, love songs, etc." 
                value={this.state.tags}
                onChange={this.tagsChanged}
                />

        <input type="submit" value="Adicionar" />
      </form>
    );
  }
});