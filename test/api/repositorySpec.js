var fileSystemMock = {};
fileSystemMock.readFile = function(p, cb) { cb(null, '{"p": 5}'); };
fileSystemMock.writeFile = function(p, d, errcb) {  };

var expect = require('chai').expect;
var sinon = require('sinon');
var mock = require('mock-require'); mock('fs', fileSystemMock);
var Repository = require('../../src/api/repository.js');

describe('Repository', function(){
	


	describe('all()', function(){

		before('configure stubs and call method', function() {

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
	});

	describe('add()', function(){
		before('configure stubs and call method', function() {
			var localData = [{ key: 'xpto' }];

			this.doneSpy = sinon.spy();
			this.writeFileSpy = sinon.spy(fileSystemMock, 'writeFile');
		 	this.jsonFilePath = 'path-to-file';
		 	
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
		});

		it('should call done() passing all the data when it is done.', function(){
			expect(this.doneSpy.calledOnce).to.be.true;
			expect(this.doneSpy.calledWithExactly(this.data)).to.be.true;
		});

	});

	after(function() {
		mock.stopAll();
	});

});