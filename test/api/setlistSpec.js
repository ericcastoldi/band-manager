var expect = require('chai').expect;
var sinon = require('sinon');
var mock = require('mock-require'); 

var data = [{key: 123}];

var allStub = sinon.stub();
allStub.callsArgWith(0, data);

var addStub = sinon.stub();
addStub.callsArgWith(1, data);

var updateStub = sinon.stub();
updateStub.callsArgWith(2, data);

exports.Repository = function() { 
	this.all = allStub; 
	this.add = addStub;
	this.update = updateStub;
};
var repositoryStub = sinon.spy(exports, 'Repository');
mock('../../src/api/repository', repositoryStub);

var Setlist = require('../../src/api/setlist.js');
describe('Setlist', function(){
	

	describe('constructor', function(){
		before('create setlist', function(){
			var setlist = new Setlist();
		});

		it('should create a new Repository passing the setlist json data file path.', function(){
			
			expect(repositoryStub.calledWithNew()).to.be.true;
			expect(repositoryStub.calledWithExactly('src/data/setlist.json')).to.be.true;

		});

		
	});

	describe('all()', function(){

		before('create setlist and call method', function(){
			
			this.setlist = new Setlist();

			this.reqSpy = sinon.spy();
			this.resSpy = { json: sinon.spy() };
			
			this.setlist.all(this.reqSpy, this.resSpy);
		});

		it('should call repository.all() to get all the data.', function(){
			expect(allStub.calledOnce).to.be.true;
		});

		it('should call res.json() passing the data received from repository.all().', function(){
			expect(this.resSpy.json.calledOnce).to.be.true;
			expect(this.resSpy.json.calledWithExactly(data)).to.be.true;
		});

	});

	describe('save()', function(){

		before('create setlist and call method', function(){
			this.setlist = new Setlist();

			this.song = { id: 123, artist: 'An Artist', name: 'The Song', tags: ['tag', 'hash'] };
			this.req = { body: this.song };
			this.resSpy = { json: sinon.spy() };
			
			this.setlist.save(this.req, this.resSpy);
		});

		it('should call repository.add() to add the song into the setlist.', function(){
			expect(addStub.calledOnce).to.be.true;
			
			var song = addStub.getCall(0).args[0];

			expect(song.id).to.equal(123);
			expect(song.artist).to.equal('An Artist');
			expect(song.name).to.equal('The Song');
			expect(song.tags[0]).to.equal('tag');
			expect(song.tags[1]).to.equal('hash');
		});

		it('should call res.json() passing the data received from repository.all().', function(){
			expect(this.resSpy.json.calledOnce).to.be.true;
			expect(this.resSpy.json.calledWithExactly(data)).to.be.true;
		});

		it('should throw an Error if req.body.song is undefined.', function(){
			var song = { otherStuff: true };
			var req = { body: song };
			var resSpy = { json: sinon.spy() };
			
			expect(this.setlist.save.bind(this.setlist, req, resSpy)).to.throw(Error, /Song must have a name./);
		});
	});

	describe('update()', function(){

		before('create setlist and call method', function(){
			this.setlist = new Setlist();

			this.song = { id: 123, artist: 'An Artist', name: 'The Song', tags: ['tag', 'hash'] };
			this.req = { body: this.song };
			this.resSpy = { json: sinon.spy() };
			
			this.setlist.update(this.req, this.resSpy);
		});

		it('should call repository.update() to update the song in the setlist.', function(){
			expect(updateStub.calledOnce).to.be.true;
			
			var song = updateStub.getCall(0).args[0];

			expect(song.id).to.equal(123);
			expect(song.artist).to.equal('An Artist');
			expect(song.name).to.equal('The Song');
			expect(song.tags[0]).to.equal('tag');
			expect(song.tags[1]).to.equal('hash');

			var where = updateStub.getCall(0).args[1];
			expect(where(song)).to.be.true;
		});

		it('should call res.json() passing the data received from repository.all().', function(){
			expect(this.resSpy.json.calledOnce).to.be.true;
			expect(this.resSpy.json.calledWithExactly(data)).to.be.true;
		});

		it('should throw an Error if req.body.name is undefined.', function(){
			var song = { otherStuff: true };
			var req = { body: song };
			var resSpy = { json: sinon.spy() };
			
			expect(this.setlist.update.bind(this.setlist, req, resSpy)).to.throw(Error, /Song must have a name./);
		});
	});

	after(function() {
		mock.stop('../../src/api/repository');
	});


});