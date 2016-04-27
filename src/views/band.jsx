var Band = React.createClass({

  var handleError = function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      };


  loadSetList: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: handleError.bind(this)
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
      error: handleError.bind(this)
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

ReactDOM.render(
  <Band url="http://localhost:3000/api/setlist">krushing demons</Band>,
  document.getElementById('content')
);