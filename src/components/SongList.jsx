var React = require('react');
var Song = require('./Song.jsx');

var actions = require('./state/actions');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;

var  SongList = React.createClass({

  componentDidMount: function() {
    this.props.fetchSongs();
  },

  rowClicked: function(id) {
    console.log('rowClicked' + id);
    this.props.selectSong(id);
  },

  renderRows: function(){
    var self = this;
    var data = this.props.data;
    var selectedSong = this.props.selectedSong;

    var songs = data.map(function (song) {
    
      var cssClass = selectedSong === song.id ? 
        'selected' : 
        '';

      return (
        <tr key={song.id} 
            className={cssClass} 
            onClick={self.rowClicked.bind(self, song.id)}>
          <td>
            <Song artist={song.artist} name={song.name} tags={song.tags} />
          </td>
        </tr>
      );

    });

    return songs;
  },

  renderNoData: function(){
    var messageCssClass = 'songlist';
    var noDataMessage = 'Sem músicas a exibir.'; 
    var fetchingMessage = 'Buscando músicas...';
    var errorMessage = 'Tivemos um problema ao buscar as músicas :(';

    var message = this.props.fetchingSongs ? 
      fetchingMessage : 
      noDataMessage;


    if(this.props.errorFetchingSongs){
      message = errorMessage;
      messageCssClass += ' error'
    }

    return (
      <h6 className={messageCssClass}>{ message }</h6>
    );
  },

  renderTable: function(){
    var rows = this.renderRows();
    return (
      <table className="u-full-width songlist">
        <thead>
          <tr>
            <th>Músicas</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  },

  render : function(){
    var noData = !this.props.data 
                || this.props.data.length === 0;

    if(noData 
      || this.props.fetchingSongs
      || this.props.errorFetchingSongs){

      return this.renderNoData();
    
    }

    return this.renderTable();
  }
});

SongList.propTypes = {
  fetchingSongs: React.PropTypes.bool,
  errorFetchingSongs: React.PropTypes.bool,
  selectedSong: React.PropTypes.number,
  selectSong: React.PropTypes.func,
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      artist: React.PropTypes.string,
      name: React.PropTypes.string,
      tags: React.PropTypes.array
    })),
  fetchSongs: React.PropTypes.func.isRequired
}

function mapSongListStateToProps(state){
  return {
    fetchingSongs: state.fetchingSongs,
    errorFetchingSongs: state.errorFetchingSongs,
    selectedSong: state.selectedSong,
    data: state.data
  } 
}

function mapSongListDispatchToProps(dispatch){
  return bindActionCreators({
    fetchSongs: actions.fetchSongs.creator,
    selectSong: actions.selectSong.creator
  }, dispatch)
}

module.exports = connect(mapSongListStateToProps, mapSongListDispatchToProps)(SongList);