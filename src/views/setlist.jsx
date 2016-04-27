var React = require('react');
var Song = require('./song.jsx');

var  Setlist = React.createClass({
  render : function(){

    var songs = this.props.data.map(function (song) {
      
      return (
        <tr>
          <td>
            <Song artist={song.artist} song={song.song} tags={song.tags.join(', ')} />
          </td>
        </tr>
      );

    });

    return (
      <table className="u-full-width">
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