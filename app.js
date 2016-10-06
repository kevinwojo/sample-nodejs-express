var express = require('express');
var fs = require('fs');
var jsonFile = require('jsonfile');
var app = express();

var obj = [
{name:'Publication #1',
description: 'Plain-text description', abstract: '<h1>Abstract</h1><p>This is the abstract of the document</p>',
doi: 'XYZ/10.4.0', author: 'Kevin Wojkovich', authorID: '1004', },
{name:'Publication #2',
description: 'Plain-text description', abstract: '<h1>Abstract</h1><p>This is the abstract of the document</p>',
doi: 'XYZ/10.4.0', author: 'Kevin Wojkovich', authorID: '1004', }

];

// Write to JSON store
jsonFile.writeFile('sample.db', obj, function(err,data) {
	if (err) {
		console.log(err);
	}
});

// Read from JSON store
jsonFile.readFile('sample.db', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
});

app.get('/', function (req, res) {
	res.send(obj);
});


function exitHandler(options, err) {

    if (options.cleanup) {
			// Write upon exit
			console.log('clean');
		}

    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

function nonblockWrite(string) {
	var stream = fs.createWriteStream("my_file.txt");
	stream.once('open', function(fd) {
	stream.write(string);
	stream.end();
	});
}

function installExitHandler() {
	process.stdin.resume();//so the program will not close instantly
	
	//do something when app is closing
	process.on('exit', exitHandler.bind(null,{cleanup:true}));
	
	//catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, {exit:true}));
	
	//catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
}


app.listen(3330, function() {
	console.log('Example is listening on port 3330');
	installExitHandler();
});
