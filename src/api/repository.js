var fs = require('fs');
var path = require('path');

function Repository(jsonFilePath){
	
	var REPO_FILE = jsonFilePath;

	this.all = function(done){
		fs.readFile(REPO_FILE, function(err, data) {
		    handleError(err);
		    done(JSON.parse(data));
		});
	}

	this.add = function(obj, done){
		this.all(function(data){
		
			data.push(obj);

			writeJsonFile(data);

			done(data);
		});
	}

	this.update = function(obj, where){
		
		var found = function(persistedObj, data){
			persistedObj = obj;
			writeJsonFile(data);
		};

		var notFound = function(data){
			data.push(obj);
			writeJsonFile(data);
		};


		this.find(where, found, notFound);
	}

	this.find = function(where, found, notFound){
		this.all(function(data){
			
			for (var i = data.length - 1; i >= 0; i--) {
				
				if(where(data[i])){
					found(data[i], data);
					return;
				}

			};

			notFound(data);
		});
	}

	var writeJsonFile = function(data){
		fs.writeFile(REPO_FILE, JSON.stringify(data, null, 4), handleError);
	}

	var handleError = function(err){
		if (err) {
		    console.error(err);
		    process.exit(1);
		}
	}
}

module.exports = Repository;