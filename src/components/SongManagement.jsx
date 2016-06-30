var React = require('react');
var SongList = require('./SongList.jsx');
var SongForm = require('./SongForm.jsx');
var SongFilterForm = require('./SongFilterForm.jsx');

var SongManagement = React.createClass({
  render: function() {
      return (
        <div>
          <SongFilterForm />
          <SongList />
          <SongForm />
        </div>
      );
    }
});

module.exports = SongManagement;
