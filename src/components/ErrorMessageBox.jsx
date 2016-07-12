var React = require('react');

var ErrorMessageBox = React.createClass({
  propTypes: {
    message: React.PropTypes.string
  },

  render: function(){
    return (
      <h6 className="messageBox error">{ this.props.message }</h6>
    );
  }
});

module.exports = ErrorMessageBox;
