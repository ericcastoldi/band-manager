var fileSystemMock = {};
fileSystemMock.readFile = function(p, cb) { cb(null, '{"p": 5}'); };
fileSystemMock.writeFile = function(p, d, errcb) {  };

var expect = require('chai').expect;
var sinon = require('sinon');
var mock = require('mock-require'); 

mock('fs', fileSystemMock);
var Repository = require('../../src/api/repository.js');

describe('Repository', function(){

	describe('all()', function(){

		before('configure stubs, spies, repo and call method', function() {

			this.doneSpy = sinon.spy();
			this.readFileSpy = sinon.spy(fileSystemMock, 'readFile');
		 	this.jsonFilePath = 'path-to-file';
		 	this.repo = new Repository(this.jsonFilePath);

		 	this.repo.all(this.doneSpy);

  		});


	 	it('should read a json file.', function(){

	 		expect(this.readFileSpy.calledOnce).to.be.true;
	 		expect(this.readFileSpy.calledWith(this.jsonFilePath)).to.be.true;

	 	});

	 	it('should call done() passing the JSON parsed data read from json file.', function(){
	 		
	 		expect(this.doneSpy.calledOnce).to.be.true;
	 		expect(this.doneSpy.calledWithExactly({p : 5})).to.be.true;

	 	});

	 	it('should handle errors from fs.readFile.', function(){
	 		var err = new Error();
			fileSystemMock.readFile = function(p, cb) { cb(err, null); };
			
	 		var consoleErrorStub = sinon.stub(console, 'error');

	 		this.repo.all(sinon.stub());
			
			expect(consoleErrorStub.calledOnce).to.be.true;
	 		expect(consoleErrorStub.calledWithExactly(err)).to.be.true;

	 		consoleErrorStub.restore();
	 	});

	 	after(function(){
	 		this.readFileSpy.restore();
	 	});
	});

	describe('add()', function(){
		before('configure stubs, spies, repo and call method', function() {
			this.doneSpy = sinon.spy();
			this.jsonFilePath = 'path-to-file';
			this.writeFileSpy = sinon.spy(fileSystemMock, 'writeFile');
		 	
		 	var localData = [{ key: 'xpto' }];
		 	this.repo = new Repository(this.jsonFilePath);
			this.allStub = sinon.stub(this.repo, "all", function(done){
				done(localData)
			});

		 	this.repo.add({key: 'mnbv'}, this.doneSpy);

		 	this.data = localData;
  		});

		it('should call all() to get all the data.', function(){
			expect(this.allStub.calledOnce).to.be.true;
		});

		it('should push obj into the data collection.', function(){
			expect(this.data.length).to.equal(2);
			expect(this.data[0].key).to.equal('xpto');
			expect(this.data[1].key).to.equal('mnbv');
		});

		it('should write the data back into the json file.', function(){
			expect(this.writeFileSpy.calledOnce).to.be.true;
			expect(this.writeFileSpy.calledWith(this.jsonFilePath)).to.be.true;
		});

		it('should call done() passing all the data when it is done.', function(){
			expect(this.doneSpy.calledOnce).to.be.true;
			expect(this.doneSpy.calledWithExactly(this.data)).to.be.true;
		});

		after(function(){
	 		this.writeFileSpy.restore();
	 	});
	});

	describe('update()', function(){
		before('configure repo and fake data', function() {
			this.find = function(where, found, notFound){};
			this.where = function(obj){ return obj.key == 123  };
			this.whereSpy = sinon.spy();
			this.persistedData = [{key: 123, value: 'abc'}, {key: 456, value: 'def'}];

			this.jsonFilePath = 'path-to-file';
			this.repo = new Repository(this.jsonFilePath);
  		});
		
		beforeEach('refresh the writeFileSpy', function(){ 
			this.writeFileSpy = sinon.spy(fileSystemMock, 'writeFile'); 
		});
		
		afterEach('restore the writeFileSpy', function(){ 
			this.findStub.restore();	
			this.writeFileSpy.restore(); 
		});

  		it('should update an existing object.', function(){
			var obj = {key: 123, value: 'abc'};
			var data = this.persistedData;
			var find = function(where, found, notFound){ found(obj, data); };
			this.findStub = sinon.stub(this.repo, "find", find);
			
			// act!
			this.repo.update({key:999, value:'updated'}, this.where)
			
			expect(this.persistedData.length).to.equal(2);
			expect(this.persistedData[0].key).to.equal(999);
			expect(this.persistedData[0].value).to.equal('updated');

			expect(this.writeFileSpy.calledOnce).to.be.true;
			expect(this.findStub.calledWith(this.where)).to.be.true;
		});

		it('should push the new obj into the data collection when it doesn\'t already exists.', function(){
			var data = this.persistedData;
			var find = function(where, found, notFound){ notFound(data); };
			this.findStub = sinon.stub(this.repo, "find", find);

			// act!
			this.repo.update({key:789, value:'new value'}, this.whereSpy);
			
			expect(this.persistedData.length).to.equal(3);
			expect(this.persistedData[2].key).to.equal(789);
			expect(this.persistedData[2].value).to.equal('new value');
			
			expect(this.writeFileSpy.calledOnce).to.be.true;
			expect(this.findStub.calledWith(this.whereSpy)).to.be.true;
		});


	});

	describe('find()', function(){

		before('setup fake data, spies and stubs and create repo', function(){
			this.foundObj = { key: 'xyz' };
			var data = [ { key: 'xpto' }, this.foundObj, { key: 'yyz' } ];

			this.writeFileSpy = sinon.spy(fileSystemMock, 'writeFile');

		 	this.repo = new Repository('path-to-file');
			this.allStub = sinon.stub(this.repo, "all", function(done){
				done(data)
			});

		 	this.data = data;
		});

		beforeEach('refresh the spies and stubs', function(){ 
			this.foundSpy = sinon.spy();
			this.notFoundSpy = sinon.spy();
			this.whereStub = sinon.stub();
		});
		
		it('should call where() for all objects in the data collection until one of them meets the where condition.', function(){
			this.repo.find(this.whereStub, this.foundSpy, this.notFoundSpy);

			expect(this.whereStub.calledThrice).to.be.true;
		});

		it('should call found() passing in the found object and all the data when the where condition is met.', function(){
			this.whereStub.onCall(1).returns(true);

			this.repo.find(this.whereStub, this.foundSpy, this.notFoundSpy);

			expect(this.whereStub.calledTwice).to.be.true;

			expect(this.foundSpy.calledOnce).to.be.true;
			expect(this.foundSpy.calledWithExactly(this.foundObj, this.data)).to.be.true;
			
			expect(this.notFoundSpy.called).to.be.false;
		});

		it('should call notFound() passing in all the data when the where condition is not met.', function(){
			this.whereStub.returns(false);

			this.repo.find(this.whereStub, this.foundSpy, this.notFoundSpy);

			expect(this.whereStub.calledThrice).to.be.true;

			expect(this.notFoundSpy.calledOnce).to.be.true;
			expect(this.notFoundSpy.calledWithExactly(this.data)).to.be.true;
			
			expect(this.foundSpy.called).to.be.false;
		});

	});

	after(function() {
		mock.stopAll();
	});

});