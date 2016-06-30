/* global describe, before, it, after */
var expect = require('chai').expect;
var songFactory = require('../../../src/api/model/song.js');

describe('songFactory', function() {
  describe('emptySong', function(){

		it('should be a new song with undefined id, artist and name, and an empty array of tags.', function(){

      var emptySong = songFactory.empty();

      expect(emptySong).to.exist;
			expect(emptySong.tags).to.be.empty;
      expect(emptySong.id).to.be.undefined;
      expect(emptySong.artist).to.be.undefined;
      expect(emptySong.name).to.be.undefined;
		});

	});
});
