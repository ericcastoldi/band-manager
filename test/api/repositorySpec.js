var fileSystemMock = {};
fileSystemMock.readFile = function(p, cb) { cb(null, '{"p": 5}'); };

var expect = require('chai').expect;
var sinon = require('sinon');
var mock = require('mock-require'); mock('fs', fileSystemMock);
var Repository = require('../../src/api/repository.js');

describe('Repository', function(){
	describe('all()', function(){
	 	it('should read a json file.', function(){
	 		var readFileSpy = sinon.spy(fileSystemMock, 'readFile');
	 		var jsonFilePath = 'path-to-file';
	 		var repo = new Repository(jsonFilePath);

	 		repo.all(sinon.stub());

	 		expect(readFileSpy.calledOnce).to.be.true;
	 		expect(readFileSpy.calledWith(jsonFilePath)).to.be.true;
	 	});

	 	it('should call done() passing the JSON parsed data read from json file.', function(){
	 		var doneSpy = sinon.spy();
	 		var jsonFilePath = 'path-to-file';
	 		var repo = new Repository(jsonFilePath);

	 		repo.all(doneSpy);

	 		expect(doneSpy.calledOnce).to.be.true;
	 		expect(doneSpy.calledWithExactly({p : 5})).to.be.true;
	 	});

	 	it('should handle errors from fs.readFile.', function(){
	 		var err = new Error();
			fileSystemMock.readFile = function(p, cb) { cb(err, null); };
			
			var processStub = sinon.stub(process, "exit");
	 		var consoleErrorStub = sinon.stub(console, 'error');

			var jsonFilePath = 'path-to-file';
	 		var repo = new Repository(jsonFilePath);

	 		repo.all(sinon.stub());
			
			expect(consoleErrorStub.calledOnce).to.be.true;
	 		expect(consoleErrorStub.calledWithExactly(err)).to.be.true;

			expect(processStub.calledOnce).to.be.true;
	 		expect(processStub.calledWithExactly(1)).to.be.true;

	 		processStub.restore()
	 		consoleErrorStub.restore();
	 	});
	});
	after(function() {
		mock.stopAll();
	});
});