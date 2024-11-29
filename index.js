//const naman = require("./second")
//const {generateRandomNumber,celciusToFahrenheit} = require("./third")
//console.log("Hello Kumar", naman);
//
//console.log(`Random number: ${generateRandomNumber()}`);
//console.log(`Random number: ${celciusToFahrenheit(0)}`);


import getPosts,{ getPostsLength } from './postcontroller.js';

console.log(getPosts());
console.log(`posts length: ${getPostsLength()}`);

