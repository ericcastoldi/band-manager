var React = require('react');

var SongFilterForm = React.createClass({

  render : function(){
    return (
      <form className="songform">
          <input  type="text"
                  placeholder="Filtrar por tags..." />

          <input type="submit" value="Filtrar" className="button-primary" />
      </form>
    );
  }
});

module.exports = SongFilterForm;
