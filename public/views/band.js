var Band = React.createClass({
  displayName: 'Band',


  loadSetList: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function () {
    return { data: [] };
  },

  componentDidMount: function () {
    this.loadSetList();
  },

  newSongAdded: function (song) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: song,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    return React.createElement(
      'div',
      { className: 'band' },
      React.createElement(
        'h1',
        null,
        this.props.children
      ),
      React.createElement(Setlist, { data: this.state.data }),
      React.createElement(SongForm, { onNewSongAdded: this.newSongAdded })
    );
  }
});

ReactDOM.render(React.createElement(
  Band,
  { url: 'http://localhost:3000/api/setlist' },
  'krushing demons'
), document.getElementById('content'));