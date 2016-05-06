var React = require('react');
var Song = require('./song.jsx');

var  Setlist = React.createClass({

  rowClicked: function(song) {
    console.log('rowClicked' + JSON.stringify(song));
    this.props.onSongSelected(song);
  },

  render : function(){
    var self = this;
    var songs = this.props.data.map(function (song) {

      return (
        <tr key={song.id} onClick={self.rowClicked.bind(self, song)}>
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
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      artist: React.PropTypes.string,
      song: React.PropTypes.string,
      tags: React.PropTypes.array
    })),
    onSongSelected: React.PropTypes.func
}

module.exports = Setlist;