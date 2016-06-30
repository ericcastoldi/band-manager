/* global describe, it */
var expect = require('chai').expect;
var songFactory = require('../../../src/api/model/songFactory');

describe('songFactory', function() {
  describe('empty()', function(){

		it('should create a new and empty song with undefined id, artist and name, and an empty array of tags.', function(){

      var emptySong = songFactory.empty();

      expect(emptySong).to.exist;
			expect(emptySong.tags).to.be.empty;
      expect(emptySong.id).to.be.undefined;
      expect(emptySong.artist).to.be.undefined;
      expect(emptySong.name).to.be.undefined;
		});

	});

  describe('createSong()', function(){
    it('should create a new song with the specified id, artist, name, and tags.', function(){
      var song = songFactory.createSong('The Artist', 'Untitled', ['hash', 'tag'], 123);

      expect(song).to.exist;
      expect(song.id).to.equal(123);
      expect(song.artist).to.equal('The Artist');
      expect(song.name).to.equal('Untitled');
      expect(song.tags).to.eql(['hash', 'tag']);
    });

    it('should throw an Error when name is undefined/falsy.', function(){
      expect(
        songFactory
          .createSong
          .bind(songFactory, 'The Artist', null, ['hash', 'tag'], 123))
        .to.throw(Error, /Song must have a name./);
    });

    it('should create a new song leaving id and artist undefined, and initializing tags with an empty array when it\'s not specified.', function(){
      var song = songFactory.createSong(null, 'Untitled', null, null);

      expect(song).to.exist;
      expect(song.tags).to.be.empty;
      expect(song.id).to.be.undefined;
      expect(song.artist).to.be.undefined;
      expect(song.name).to.equal('Untitled');
    });

  });

  describe('fromPartialSongish()', function(){
    it('should create a proper song based on the specified songish.', function(){
      var songish = { name: 'Songish Name', id: 123, anotherProperty: false };

      var song = songFactory.fromPartialSongish(songish);

      expect(song).to.exist;
      expect(song.id).to.equal(123);
      expect(song.artist).to.be.undefined;
      expect(song.name).to.equal('Songish Name');
      expect(song.tags).to.eql([]);
    });

    it('should define a new id to the song when the songish doesn\'t already have one.', function(){
      var songish = { name: 'Songish Name', artist: 'Songish Artist', otherProperty: true, anotherProperty: false, tags: ['tag1'] };

      var song = songFactory.fromPartialSongish(songish);

      expect(song).to.exist;
      expect(song.id).to.exist;
      expect(song.artist).to.equal('Songish Artist');
      expect(song.name).to.equal('Songish Name');
      expect(song.tags).to.eql(['tag1']);
    });

    it('should NOT throw an Error when songish does not have a name.', function(){
      var songish = { artist: 'Songish Artist', otherProperty: true, anotherProperty: false, tags: ['tag1'] };

      var song = songFactory.fromPartialSongish(songish);

      expect(song).to.exist;
      expect(song.id).to.exist;
      expect(song.name).to.be.undefined;

      expect(song.artist).to.equal('Songish Artist');
      expect(song.tags).to.eql(['tag1']);
    });

    it('should throw an Error when songish is undefined/falsy.', function(){
      expect(
        songFactory
          .fromPartialSongish
          .bind(songFactory, null))
          .to.throw(Error, /There\'s no songish./);
    });
  });

  describe('fromSongish()', function(){
    it('should create a proper song based on the specified songish.', function(){
      var songish = { name: 'Songish Name', id: 123, anotherProperty: false };

      var song = songFactory.fromSongish(songish);
      expect(song).to.exist;
      expect(song.id).to.equal(123);
      expect(song.artist).to.be.undefined;
      expect(song.name).to.equal('Songish Name');
      expect(song.tags).to.eql([]);
    });

    it('should define a new id to the song when the songish doesn\'t already have one.', function(){
      var songish = { name: 'Songish Name', artist: 'Songish Artist', otherProperty: true, anotherProperty: false, tags: ['tag1'] };

      var song = songFactory.fromSongish(songish);
      expect(song).to.exist;
      expect(song.id).to.exist;
      expect(song.artist).to.equal('Songish Artist');
      expect(song.name).to.equal('Songish Name');
      expect(song.tags).to.eql(['tag1']);
    });

    it('should throw an Error when songish is undefined/falsy.', function(){
      expect(
        songFactory
          .fromSongish
          .bind(songFactory, null))
          .to.throw(Error, /There\'s no songish./);
    });

    it('should throw an Error when songish does not have a name.', function(){
      var songish = { artist: 'Songish Artist', otherProperty: true, anotherProperty: false, tags: ['tag1'] };

      expect(
        songFactory
          .fromSongish
          .bind(songFactory, songish))
          .to.throw(Error, /Song must have a name./);
    });

  });

  describe('fromSongishAndId()', function(){
    it('should create a proper song based on the specified songish using the specified id.', function(){
      var songish = { name: 'Songish Name', id: 123, anotherProperty: false };

      var song = songFactory.fromSongishAndId(456, songish);
      expect(song).to.exist;
      expect(song.id).to.equal(456);
      expect(song.artist).to.be.undefined;
      expect(song.name).to.equal('Songish Name');
      expect(song.tags).to.eql([]);
    });

    it('should throw an Error when songish is undefined/falsy.', function(){
      expect(
        songFactory
          .fromSongishAndId
          .bind(songFactory, 456, null))
          .to.throw(Error, /There\'s no songish./);
    });

    it('should throw an Error when songish does not have a name.', function(){
      var songish = { artist: 'Songish Artist', otherProperty: true, anotherProperty: false, tags: ['tag1'] };

      expect(
        songFactory
          .fromSongishAndId
          .bind(songFactory, 456, songish))
          .to.throw(Error, /Song must have a name./);
    });
  });

  describe('createQueryById()', function(){
    it('should return a function that checks if a song has an specified id.', function(){
      var song123 = {id: 123};
      var song456 = {id: 456};

      var queryById = songFactory.createQueryById(123);

      expect(queryById(song123)).to.be.true;
      expect(queryById(song456)).to.be.false;
    });
  });
});
