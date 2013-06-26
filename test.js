#!/usr/bin/env node

var typo = require("./typo.js");

typo("Whatever", false, function(typos){
	console.log("Default:", typos.join());
});

typo("Whatever", true, function(typos){
	console.log("Extended:", typos.join());
});

