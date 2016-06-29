var React = require('react');
var MessageBox = require('./MessageBox.jsx');
var ErrorMessageBox = require('./ErrorMessageBox.jsx');
var SongGrid = require('./SongGrid.jsx');
var SongFilterForm = require('./SongFilterForm.jsx');

var actions = require('./state/actions');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;


var SongList = React.createClass({

  componentDidMount: function() {
    this.props.fetchSongs();
  },

  render: function(){

    if(this.props.fetchingSongs) {
       return (
          <MessageBox message="Buscando músicas..." />
       );
    }

    if(this.props.errorFetchingSongs) {
      return (
         <ErrorMessageBox message="Tivemos um problema ao buscar as músicas :(" />
      );
    }

    var noData = !this.props.data
                || this.props.data.length === 0;

    if(noData) {
       return (
          <MessageBox message="Sem músicas a exibir." />
       );
    }

    return (
      <div>
        <SongFilterForm />
        <SongGrid
          data={this.props.data}
          selectSong={this.props.selectSong}
          selectedSong={this.props.selectedSong}
          />
      </div>
    );
  }
});

SongList.propTypes = {
  fetchSongs: React.PropTypes.func.isRequired,
  fetchingSongs: React.PropTypes.bool,
  errorFetchingSongs: React.PropTypes.bool,
  selectSong: React.PropTypes.func,
  selectedSong: React.PropTypes.number,
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      artist: React.PropTypes.string,
      name: React.PropTypes.string,
      tags: React.PropTypes.array
    }))
};

function mapSongListStateToProps(state){
  return {
    fetchingSongs: state.fetchingSongs,
    errorFetchingSongs: state.errorFetchingSongs,
    selectedSong: state.selectedSong,
    data: state.data
  };
}

function mapSongListDispatchToProps(dispatch){
  return bindActionCreators({
    fetchSongs: actions.fetchSongs.creator,
    selectSong: actions.selectSong.creator
  }, dispatch);
}

module.exports = connect(mapSongListStateToProps, mapSongListDispatchToProps)(SongList);
