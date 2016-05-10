var React = require('react');
var Song = require('./Song.jsx');

var actions = require('./state/actions');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;

var  SongList = React.createClass({

  rowClicked: function(id) {
    console.log('rowClicked' + id);
    this.props.selectSong(id);
  },

  render : function(){
    var self = this;
    var songs = this.props.data.map(function (song) {
      var cssClass = self.props.selectedSong === song.id ? 'selected' : '';

      return (
        <tr key={song.id} className={cssClass} onClick={self.rowClicked.bind(self, song.id)}>
          <td>
            <Song artist={song.artist} song={song.song} tags={song.tags} />
          </td>
        </tr>
      );

    });

    return (
      <table className="u-full-width setlist">
        <thead>
          <tr>
            <th>Músicas</th>
          </tr>
        </thead>
        <tbody>
          { songs }
        </tbody>
      </table>
      );
  }
});

SongList.propTypes = {
  selectedSong: React.PropTypes.number,
  selectSong: React.PropTypes.func,
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      artist: React.PropTypes.string,
      song: React.PropTypes.string,
      tags: React.PropTypes.array
    }))
}

function mapSongListStateToProps(state){
  return {
    selectedSong: state.selectedSong,
    data: state.data
  } 
}

function mapSongListDispatchToProps(dispatch){
  return bindActionCreators({
    selectSong: actions.selectSong.creator
  }, dispatch)
}

module.exports = connect(mapSongListStateToProps, mapSongListDispatchToProps)(SongList);