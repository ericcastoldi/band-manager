var React = require('react');
var Song = require('./song.jsx');

var  Setlist = React.createClass({

  rowClicked: function(id) {
    console.log('rowClicked' + id);
    this.props.selectSong(id);
  },

  render : function(){
    var self = this;
    var songs = this.props.data.map(function (song) {
      var cssClass = self.props.selectedSong == song.id ? 'selected' : '';

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

Setlist.propTypes = {
  selectedSong: React.PropTypes.number,
  selectSong: React.PropTypes.func,
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      artist: React.PropTypes.string,
      song: React.PropTypes.string,
      tags: React.PropTypes.array
    })),
}

module.exports = Setlist;