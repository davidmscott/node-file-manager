var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] == "rm") {
			//rm <filename>
			removeFile(inputSplit[1]);
		} else if (inputSplit[0] == "replace") {
			//replace <file to search> <word to delete> <word to insert>
			replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] == "grep") {
			//grep <filename> <word to find>
			findLine(inputSplit[1], inputSplit[2]);
}
	}
};

//find a line in a file
function findLine(fileName, searchWord) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Could not complete search operation");
		} else {
			var lines = data.toString().split("\n");
			console.log(lines);
			for (var i = 0; i < lines.length; i++) {
				if (lines[i].toString().indexOf(searchWord) !== -1) {
					console.log(lines[i]);
				}
			}
		}
	});
}

//find and replace a word in a file
function replaceWord(fileName, deleteWord, insertWord) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Could not complete replace operation");
		} else {
			var re = new RegExp(deleteWord, "g");
			var result = data.toString().replace(re, insertWord);
			fs.writeFile(fileName, result, function(err) {
				if (err) {
					console.log("Could not complete replace operation");
				} else {
					console.log('Replaced all instances of "' + deleteWord + '" with "' + insertWord + '"');
				}
			});
		}
	});
}

//remove a file (rm)
function removeFile(fileName) {
	fs.unlink(fileName, function(err){
		if (err) {
			console.log("Could not remove " + fileName);
		} else {
			console.log("Removed " + fileName);
		}
	});
}

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

