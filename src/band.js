var data = [
    {
        "id": 1388534400000,
        "artist": "krushing demons",
        "song": "i came to chew gum and krush demons, and i'm all out of gum",
        "tags": [ "autoral", "2010's", "thrash metal" ]
    },
    {
        "id": 1420070400000,
        "artist": "Queen",
        "song": "The show must go on",
        "tags": [ "cover", "80's", "classic rock" ]
    },
    {
        "id": 1458882345512,
        "artist": "Gorillaz",
        "song": "Clint Eastwood",
        "tags": [ "cover", "2000's", "alternative" ]
    },
    {
        "id": 1458882373879,
        "artist": "Linkin Park",
        "song": "Numb",
        "tags": [ "cover", "2000's", "nu-metal" ]
    }
];


var Band = React.createClass({

  loadSetList: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
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
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
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
  <Band  url="http://localhost:3000/api/setlist">krushing demons</Band>,
  document.getElementById('content')
);