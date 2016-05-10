var React = require('react');
var SongFields = require('./SongFields.jsx');

var actions = require('./state/actions');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;

var SongForm = React.createClass({
  

  addNewSong: function(){
    this.props.newSong();
  },
  saveSong: function(e){
    e.preventDefault();
    this.props.saveSong(this.props.artist, this.props.song, this.props.tags);
  },
  
  render: function(){
      
      return (
        <form className="songform" onSubmit={this.saveSong}>
          
          <SongFields artist={this.props.artist} song={this.props.song} tags={this.props.tags} editingSongChanged={this.props.changeEditingSong} />

          <input type="button" onClick={this.addNewSong} value="Novo" className="button" />
          <input type="submit" value="Salvar" className="button-primary" />

        </form>
      );
  }
});

SongForm.propTypes = {
  artist: React.PropTypes.string,
  song: React.PropTypes.string,
  tags: React.PropTypes.arrayOf(React.PropTypes.string)
  //onNewSongAdded: React.PropTypes.func
}

function mapSongFormStateToProps(state) {
    return {
      artist: state.editingSong.artist,
      song: state.editingSong.song,
      tags: state.editingSong.tags
    }
}

function mapSongFormDispatchToProps(dispatch) {
  return bindActionCreators({
    newSong: actions.newSong.creator, 
    saveSong: actions.saveSong.creator, 
    changeEditingSong: actions.changeEditingSong.creator
  }, dispatch)
}

var SongForm = connect(mapSongFormStateToProps, mapSongFormDispatchToProps)(SongForm);

module.exports = SongForm;
