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
  render: function() {
    return (
      <div className="band">
        <h1>{ this.props.children }</h1>
        <Setlist data={this.props.data} />
        <SongForm />
      </div>
    );
  }
});

ReactDOM.render(
  <Band data={data}>krushing demons</Band>,
  document.getElementById('content')
);