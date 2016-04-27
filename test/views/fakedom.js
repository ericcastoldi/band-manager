var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body><div id="content"></div></body></html>');
global.window = document.parentWindow;