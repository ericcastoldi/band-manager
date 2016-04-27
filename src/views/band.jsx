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
      error: this.handleError.bind(this)
    });
  },

  getInitialState: function(){
    return { data: [] };
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
      error: this.handleError.bind(this)
    });
  },

  render: function() {
    return (
      <div className="band">
        <h1>{ this.props.children }</h1>
        <Setlist data={this.state.data} />
        <SongForm onNewSongAdded={this.newSongAdded} />
      </div>
    );
  }

  
});

module.exports = Band;