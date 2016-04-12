var  Setlist = React.createClass({
  render : function(){
    var songs = this.props.data.map(function (song) {
      
      return (
        <li>
          <Song artist={song.artist} song={song.song} tags={song.tags} />
        </li>
      );

    });

    return (
        <ul className="setlist">
          { songs }
        </ul>
      );
  }
});