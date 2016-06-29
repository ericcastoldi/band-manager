var React = require('react');
var SongList = require('./SongList.jsx');
var SongForm = require('./SongForm.jsx');

var SongManagement = React.createClass({
  render: function() {
      return (
        <div>
          <SongList />
          <SongForm />
        </div>
      );
    }
});

module.exports = SongManagement;
