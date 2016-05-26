var React = require('react');

var SongFields = React.createClass({


  artistChanged: function (e) {
    this.fieldChanged({artist: e.target.value});
  },

  nameChanged: function (e) {
    this.fieldChanged({name: e.target.value})
  },

  tagsChanged: function (e) {
    var tags = [];
    var renderedTags = e.target.value;
    
    this.fieldChanged({
      tags: tags.concat(renderedTags.split(','))
                .map(function(tag){ 
                  return tag.trim(); 
                })
      });
  },

  fieldChanged: function(change){
    
    var updatedSong = Object.assign({}, this.props, change);
    
    console.dir(change);

    this.props.editingSongChanged(
      updatedSong.artist, 
      updatedSong.name, 
      updatedSong.tags,
      updatedSong.id
    );
  },

  getDefaultProps: function() {
    return {
      artist: '', 
      name: '', 
      tags: [],
      id: undefined
    }
  },

  render: function(){
    var tags = [];
    var renderableTags = tags.concat(this.props.tags).map(function(tag){ return tag.trim(); }).join(', ');

      
      var inputs = [
        { 
          key: 'songform-artist', 
          placeholder: 'Artista', 
          value:this.props.artist, 
          changed: this.artistChanged
        },
        { 
          key: 'songform-name', 
          placeholder: 'Música', 
          value:this.props.name, 
          changed: this.nameChanged 
        },
        { 
          key: 'songform-tags', 
          placeholder: 'tags... 80s, rock, love songs, etc.', 
          value: renderableTags, 
          changed: this.tagsChanged 
        }
      ];

      var disableFields = this.props.disabled;
      var renderedInputs = inputs.map(function (input) {
        
        return (
          <input  type="text" 
                  placeholder={input.placeholder}
                  value={input.value}
                  key={input.key}
                  onChange={input.changed}
                  disabled={disableFields}
          />
        );

      });

      return (
        <div>
          { renderedInputs }
        </div>
      );
  }

});

SongFields.propTypes = {
  disabled: React.PropTypes.bool,
  id: React.PropTypes.number,
  artist: React.PropTypes.string,
  name: React.PropTypes.string,
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
  editingSongChanged: React.PropTypes.func.isRequired
}

module.exports = SongFields;


