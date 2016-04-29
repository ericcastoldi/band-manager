module.exports = function(markup) {
  if (typeof document !== 'undefined') return;

  var defaultMarkup = '<!doctype html><html><body><div id="content"></div></body></html>';

  var jsdom = require('jsdom').jsdom;

  global.document = jsdom(markup || defaultMarkup);
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
};
