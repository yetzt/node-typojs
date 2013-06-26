# TypoJS

Humans make a lot of typos. This software tries to behave as human as possible in this aspect. 

## Typo Generators

### Standard

* __Keyboard Mishit__ – Typicak keyboard mishits based on `QUERTY` and `QUERTZ` keyboard layouts
* __Double Characters__ – Hittingg a character twice
* __Missing Characters__ – Nt hitting a character
* __Mixing Characters__ – Mixign up two neighbouring characters

### Extended

* __Sausage Fingers__ - Typicakl second keys accidentially pressed when hitting between keys
* __Character Shift__ - Hittgin a character two positions too soon or too late 
* __Character Flip__ - Mixgni two characters by two positions 

## Installation

````
npm install typojs
````

## Methods

var typo = require("typojs");

### typo(string, extended, callback(typos))

* `string` is a String you want to get typos for
* `extended` generates more, less common typos
* `callback` is a callback method with all generated typos as first argument

## Example

```` javascript

var typo = require("typojs");

typo("Whatever", true, function(typos){
	console.log(typos);
});

````

## Dedication

This software is dedicated to my dear friend, [the Imperator of Cucumbers](https://twitter.com/TheGurkenkaiser), who makes a lot of typos.

## License

TypoJS is [Unlicensed Public Domain](http://unlicense.org/UNLICENSE).

## Flattr

[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=yetzt&url=http://github.com/yetzt/node-typojs&title=TypoJS&language=&tags=github&category=software)

