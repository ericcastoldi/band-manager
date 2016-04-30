var React = require('react');
var Setlist = require('./setlist.jsx');
var SongForm = require('./songform.jsx');

var Band = React.createClass({
  handleError : function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
  },

  loadSetList: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: this.handleError
    });
  },

  songSelected: function(song){
    console.log('songSelected' + JSON.stringify(song));
    this.setState({selectedSong: song});
  },

  getInitialState: function(){
    return { data: [], selectedSong: {} };
  },

  componentDidMount: function() {
    this.loadSetList();
  },

  newSongAdded: function(song) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: song,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: this.handleError
    });
  },

  songChanged : function(song){
    console.log(song);
    this.setState({selectedSong:song})
  },

  render: function() {
    return (
      <div className="band">
        <h1>{ this.props.children }</h1>
        <Setlist 
            onSongSelected={this.songSelected} 
            data={this.state.data} />

        <SongForm 
            song={this.state.selectedSong} 
            songChanged={this.songChanged}
            onNewSongAdded={this.newSongAdded} />
      </div>
    );
  }

  
});

module.exports = Band;