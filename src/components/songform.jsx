var React = require('react');

// var SongForm = React.createClass({

//   addSong: function(e){
//     e.preventDefault();
    
//     var song = this.props.song.trim();
//     if (!song) {
//       return;
//     }

//     var artist = this.props.artist.trim();
//     var tags = this.props.tags.split(',').map(function(tag) {
//       return tag.trim();
//     });

//     this.props.onNewSongAdded({artist: artist, song: song, tags: tags});
//   },
//   render: function(){
    
//     var inputs = [
//       { key: 'songform-artist', placeholder: 'Artista', value:this.props.artist },
//       { key: 'songform-song', placeholder: 'Música', value:this.props.song },
//       { key: 'songform-tags', placeholder: 'tags... 80s, rock, love songs, etc.', value:this.props.song.tags }
//     ];

//     var renderedInputs = inputs.map(function (input) {
      
//       return (
//         <input  type="text" 
//                 placeholder={input.placeholder}
//                 value={input.value}
//                 key={input.key}
//                 />
//       );

//     });

//     return (
//       <form className="songform" onSubmit={this.addSong}>
        
//         { renderedInputs }

//         <input type="submit" value="Adicionar" className="button-primary" />

//       </form>
//     );
//   }
// });

var SongFields = React.createClass({
  
  fieldChanged: function(change){
    
    var updatedProps = Object.assign({}, this.props, change);
    console.dir(change);

    this.props.editingSongChanged(updatedProps);
  },

  artistChanged: function (e) {
    console.log(e.target.value);
    this.fieldChanged({artist: e.target.value})
  },

  songChanged: function (e) {
    console.log(e.target.value);
    this.fieldChanged({song: e.target.value})
  },

  tagsChanged: function (e) {
    console.log(e.target.value);
    var tags = [];
    var renderedTags = e.target.value;
    
    this.fieldChanged({tags: tags.concat(renderedTags.split(','))});
  },
   render: function(){
      
      var tags = [];
      var renderableTags = tags.concat(this.props.tags).join(', ');
      var inputs = [
        { 
          key: 'songform-artist', 
          placeholder: 'Artista', 
          value:this.props.artist, 
          changed: this.artistChanged 
        },
        { 
          key: 'songform-song', 
          placeholder: 'Música', 
          value:this.props.song, 
          changed: this.songChanged 
        },
        { 
          key: 'songform-tags', 
          placeholder: 'tags... 80s, rock, love songs, etc.', 
          value: renderableTags, 
          changed: this.tagsChanged 
        }
      ];

      var renderedInputs = inputs.map(function (input) {
        
        return (
          <input  type="text" 
                  placeholder={input.placeholder}
                  value={input.value}
                  key={input.key}
                  onChange={input.changed}
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


var SongForm = React.createClass({
  

  addNewSong: function(){
    this.props.newSong();
  },
  saveSong: function(e){
    e.preventDefault();
    this.props.saveSong(this.props.artist, this.props.song, this.props.tags);
  },
  
  render: function(){
      // var renderableTags =  this.props.tags.join(', ');
      // var inputs = [
      //   { key: 'songform-artist', placeholder: 'Artista', value:this.props.artist, changed: this.artistChanged },
      //   { key: 'songform-song', placeholder: 'Música', value:this.props.song, changed: this.songChanged },
      //   { key: 'songform-tags', placeholder: 'tags... 80s, rock, love songs, etc.', value: renderableTags, changed: this.tagsChanged }
      // ];

      // var renderedInputs = inputs.map(function (input) {
        
      //   return (
      //     <input  type="text" 
      //             placeholder={input.placeholder}
      //             value={input.value}
      //             key={input.key}
      //             onChange={input.changed}
      //             />
      //   );

      // });

      return (
        <form className="songform" onSubmit={this.saveSong}>
          
          <SongFields artist={this.props.artist} song={this.props.song} tags={this.props.tags} editingSongChanged={this.props.changeEditingSong} />

          <input type="button" onClick={this.addNewSong} value="Novo" className="button" />
          <input type="submit" value="Salvar" className="button-primary" />

        </form>
      );
  }
});

SongForm.propTypes = {
  artist: React.PropTypes.string,
  song: React.PropTypes.string,
  tags: React.PropTypes.arrayOf(React.PropTypes.string)
  //onNewSongAdded: React.PropTypes.func
}

module.exports = SongForm;
