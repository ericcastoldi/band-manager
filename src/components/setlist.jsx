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

module.exports = Setlist;