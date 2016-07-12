var React = require('react');

var actions = require('./state/actions');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;

var SongFilter = React.createClass({
  propTypes: {
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    filterSongs: React.PropTypes.func.isRequired,
    changeFilteredTags: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      tags: []
    };
  },

  tagsChanged: function (e) {
    var tags = [];
    var renderedTags = e.target.value;

    if(!renderedTags){
      this.props.changeFilteredTags([]);
      return;
    }

    var tagArray =
      tags.concat(renderedTags.split(','))
          .map(function(tag){ return tag.trim(); });

    this.props.changeFilteredTags(tagArray);
    // this.props.changeFilteredTags({
    //   tags: tags.concat(renderedTags.split(','))
    //             .map(function(tag){
    //               return tag.trim();
    //             })
    //   });
  },

  filter: function(e){

    e.preventDefault();

    this.props.filterSongs(this.props.tags);
  },

  render: function(){
    var tags = [];
    var renderableTags = tags.concat(this.props.tags).map(function(tag){ return tag.trim(); }).join(', ');

    return (
      <form className="SongFilter-form" onSubmit={this.filter}>
          <input type="text"
                 value={renderableTags}
                 onChange={this.tagsChanged}
                 placeholder="Filtrar por tags..." />

          <input type="submit" value="Filtrar" className="button-primary SongFilter-button" />
      </form>
    );
  }
});


function mapSongFilterStateToProps(state) {
    return {
      tags: state.filteredTags
    };
}

function mapSongFilterDispatchToProps(dispatch) {
  return bindActionCreators({
    filterSongs: actions.filterSongs.creator,
    changeFilteredTags: actions.changeFilteredTags.creator
  }, dispatch);
}

module.exports = connect(mapSongFilterStateToProps, mapSongFilterDispatchToProps)(SongFilter);
