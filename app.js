var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello world!');
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

nonblockWrite("application started ....\n" + Date.now());
installExitHandler();

app.listen(3000, function() {
	console.log('Example is listening on port 3000');
});
