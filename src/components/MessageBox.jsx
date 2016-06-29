var React = require('react');

var MessageBox = React.createClass({
  propTypes: {
    message: React.PropTypes.string
  },

  render: function(){
    return (
      <h6 className="messageBox">{ this.props.message }</h6>
    );
  }
});

module.exports = MessageBox;
