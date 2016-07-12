var fs = require('fs');

function Repository(jsonFilePath){

	var REPO_FILE = jsonFilePath;

	var handleError = function(err){
		if (err) {
				console.error(err);
		}
	};

	var writeJsonFile = function(data){
		fs.writeFile(REPO_FILE, JSON.stringify(data, null, 4), handleError);
	};

	var addNew = function(data, obj){
		data.push(obj);
		writeJsonFile(data);
	};

	this.all = function(done){
		fs.readFile(REPO_FILE, function(err, data) {
			handleError(err);
			done(JSON.parse(data));
		});
	};

	this.add = function(obj, done){
		this.all(function(data){
			addNew(data, obj);
			done(data);
		});
	};

	this.update = function(obj, where, done){

		var found = function(persistedObj, data){

				var index = data.findIndex(where);
				data.splice(index, 1, obj);

				writeJsonFile(data);

				done(data);
		};

		var notFound = function(data){
			addNew(data, obj);
			done(data);
		};

		this.find(where, found, notFound);
	};

	this.filter = function(where, done){
		this.all(function(data){
			var filteredData = data.filter(function(song){
				return where(song);
			});

			done(filteredData);
		});
	};

	this.find = function(where, found, notFound){
		this.all(function(data){

			var obj = data.find(where);
			if (obj) {
				found(obj, data);
				return;
			}

			notFound(data);
		});
	};
}

module.exports = Repository;
