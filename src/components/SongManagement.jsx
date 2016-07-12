var React = require('react');
var SongList = require('./SongList.jsx');
var SongForm = require('./SongForm.jsx');
var SongFilter = require('./SongFilter.jsx');

var SongManagement = React.createClass({
  render: function() {
      return (
        <div>
          <SongFilter />
          <SongList />
          <SongForm />
        </div>
      );
    }
});

module.exports = SongManagement;
