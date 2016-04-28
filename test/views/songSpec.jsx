require('./fakedom')();
var expect = require('chai').expect;
var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var Song = require('../../src/views/song.jsx');

describe('Song component', function(){

  before('render and locate element', function() {
    var songComponentElementTree = ReactTestUtils.renderIntoDocument(
      <Song artist="The Artist" song="Singin' Songs About The Future" tags="reggae, power" />
    );

    this.songDivElement = ReactTestUtils.findRenderedDOMComponentWithTag(songComponentElementTree, 'div');
  });

  it('should render an <div> element with the "song" css class.', function() {
    
    expect(this.songDivElement.tagName).to.equal('DIV');
    expect(this.songDivElement.classList.length).to.equal(1);
    expect(this.songDivElement.classList[0]).to.equal('song');

  });  

  it('should render an <em> element with the song description formatted as "Artist - Song".', function() {
    
    var em = this.songDivElement.children[0];

    expect(em.tagName).to.equal('EM');
    expect(em.textContent).to.equal('The Artist - Singin\' Songs About The Future');

  });

  it('should render an <small> element with the comma-separated song tags.', function() {
    
    var small = this.songDivElement.children[1];
    
    expect(small.tagName).to.equal('SMALL');
    expect(small.textContent).to.equal('reggae, power');

  });

});