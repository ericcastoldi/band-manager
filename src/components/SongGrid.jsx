var React = require('react');
var Song = require('./Song.jsx');

var SongGrid = React.createClass({

  rowClicked: function(id) {
    console.log('rowClicked' + id);
    this.props.selectSong(id);
  },

  render: function(){
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
  }
});

SongGrid.propTypes = {
  selectSong: React.PropTypes.func.isRequired,
  selectedSong: React.PropTypes.number,
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      artist: React.PropTypes.string,
      name: React.PropTypes.string,
      tags: React.PropTypes.array
    }))
};

module.exports = SongGrid;
