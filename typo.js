#!/usr/bin/bin/env node

String.prototype.replaceAt=function(pos, ch) {
	return [this.substr(0, pos), ch, this.substr(pos+1)].join('');
};

/* keyboard map for querty and quertz layouts */
var keymap = {
	"1": ["2","q"],
	"2": ["1","q","w","3"],
	"3": ["2","w","e","4"],
	"4": ["3","e","r","5"],
	"5": ["4","r","t","6"],
	"6": ["5","t","y","z","7"],
	"7": ["6","y","z","u","8"],
	"8": ["7","u","i","9"],
	"9": ["8","i","o","0"],
	"0": ["9","o","p"],
	"q": ["1","2","w","a"],
	"w": ["q","a","s","e","3","2"],
	"e": ["w","s","d","r","4","3"],
	"r": ["e","d","f","t","5","4"],
	"t": ["r","f","g","y","z","6","5"],
	"y": ["t","g","h","u","7","6","x","s","a"],
	"u": ["y","z","h","j","i","8","7"],
	"i": ["u","j","k","o","9","8"],
	"o": ["i","k","l","p","0","9"],
	"p": ["o","l","0"],
	"a": ["y","z","s","w","q"],
	"s": ["a","y","z","x","d","e","w"],
	"d": ["s","x","c","f","r","e"],
	"f": ["d","c","v","g","t","r"],
	"g": ["f","v","b","h","y","z","t"],
	"h": ["g","b","n","j","u","y","z"],
	"j": ["h","n","m","k","i","u"],
	"k": ["j","m","l","o","i"],
	"l": ["k","p","o"],
	"z": ["x","s","a","t","g","h","u","7","6"],
	"x": ["y","z","c","d","s"],
	"c": ["x","v","f","d"],
	"v": ["c","b","g","f"],
	"b": ["v","n","h","g"],
	"n": ["b","m","j","h"],
	"m": ["n","k","j"],
	"ö": ["l","p","ü","ä","-","."],
	"ä": ["-","ö","ü","+","#"],
	"ü": ["p","ö","ä","+","´","ß"],
	"ß": ["ü","p","0"]
}

var typo = function(word, extended, callback) {
	
	var _word = word.toLocaleLowerCase();
	var _typos = [];
	var _length = _word.length;

	if (typeof extended === "function") {
		var callback = extended;
		var extended = false;
	}

	/* original word */
	_typos.push(_word);
	
	for (var i = 0; i < _length; i++) {

		if (word[i] in keymap) keymap[word[i]].forEach(function(ch) {

			/* keyboard mishit */
			_typos.push(_word.replaceAt(i, ch));
			
			if (!extended) return;
			
			/* sausagefingers */
			_typos.push(_word.replaceAt(i, [word[i], ch].join('')));
			_typos.push(_word.replaceAt(i, [ch, word[i]].join('')));

		});
		
		/* double and missing characters */
		_typos.push(_word.replaceAt(i, ''))
		_typos.push(_word.replaceAt(i, [_word[i], _word[i]].join('')));

		if (i < (_length-1)) {
		
			/* character shiftflips */
			_typos.push(_word
				.replaceAt(i, _word[i+1])
				.replaceAt(i+1, _word[i])
			);
		
		}

		if (extended) {

			if (i < (_length-2)) {

				/* character shift left */
				_typos.push(_word
					.replaceAt(i, _word[i+2])
					.replaceAt(i+1, _word[i])
					.replaceAt(i+2, _word[i+1])
				);
			
				/* character flip left */
				_typos.push(_word
					.replaceAt(i, _word[i+2])
					.replaceAt(i+2, _word[i])
				);

			}
		
			if (i > 1) {
			
				/* character shift right */
				_typos.push(_word
					.replaceAt(i, _word[i-2])
					.replaceAt(i-1, _word[i])
					.replaceAt(i-2, _word[i-1])
				);
			
				/* character flip right */
				_typos.push(_word
					.replaceAt(i, _word[i-2])
					.replaceAt(i-2, _word[i])
				);

			}
			
		}
		
	}
	
	var typos = [];
	_typos.forEach(function(t){
		if (typos.indexOf(t) < 0) typos.push(t);
	});

	/* act blocking if no callback is given */
	if (typeof callback !== "function") return typos;

	/* call back */
	callback(typos);
	
};

/* 
	double permutation; 
	you don't want to use this on long strings. 
	this method is purposely unexposed
*/
var doubletypo = function(word, callback) {
	typo(word, function(typos){
		var _c = 0;
		var _l = typos.length;
		typos.forEach(function(t){
			typo(t, function(typos2){
				typos2.forEach(function(t){
					if (typos.indexOf(t) <= 0) typos.push(t);
				});
				_c++;
				if (_c === _l) callback(typos);
			});
		});
	});
}

module.exports = typo;
