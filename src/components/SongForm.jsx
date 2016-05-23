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
    
    this.props.saveSong(
      this.props.artist, 
      this.props.song, 
      this.props.tags,
      this.props.id
    );

  },
  
  render: function(){
      
      return (
        <form className="songform" onSubmit={this.saveSong}>
          
          <SongFields 
              disabled={this.props.savingSong}
              artist={this.props.artist} 
              song={this.props.song} 
              tags={this.props.tags} 
              id={this.props.id} 
              editingSongChanged={this.props.changeEditingSong} 
          />

          <input disabled={this.props.savingSong} type="button" onClick={this.addNewSong} value="Novo" className="button" />
          <input disabled={this.props.savingSong} type="submit" value="Salvar" className="button-primary" />

        </form>
      );
  }
});

SongForm.propTypes = {

  id: React.PropTypes.number,
  artist: React.PropTypes.string,
  song: React.PropTypes.string,
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
  newSong: React.PropTypes.func.isRequired,
  saveSong: React.PropTypes.func.isRequired,
  savingSong: React.PropTypes.bool,
  changeEditingSong: React.PropTypes.func.isRequired
};

function mapSongFormStateToProps(state) {
    return {
      artist: state.editingSong.artist,
      song: state.editingSong.song,
      tags: state.editingSong.tags,
      id: state.editingSong.id,
      savingSong: state.savingSong
    }
}

function mapSongFormDispatchToProps(dispatch) {
  return bindActionCreators({
    newSong: actions.newSong.creator, 
    saveSong: actions.saveSong.creator, 
    changeEditingSong: actions.changeEditingSong.creator
  }, dispatch)
}

module.exports = connect(mapSongFormStateToProps, mapSongFormDispatchToProps)(SongForm);