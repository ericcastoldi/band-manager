var expect = require('chai').expect;
var sinon = require('sinon');
var mock = require('mock-require');

var readFileMock = sinon.spy();
mock('fs', { readFile: readFileMock });



var Repository = require('../../src/api/repository.js');

describe('Repository', function(){

	describe('all()', function(){
	 	it('should read a json file', function(){
	 		var jsonFilePath = 'path-to-file';
	 		var repo = new Repository(jsonFilePath);

	 		repo.all();

	 		expect(readFileMock.calledOnce).to.be.true;
	 		expect(readFileMock.calledWith(jsonFilePath)).to.be.true;
	 	})
	});

});