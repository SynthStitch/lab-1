console.log('Hello, Daniel!');

// function sum(a, b) {
//     console.log(a + b);
// }

// sum(2, 3);

// const Sentiment = require('sentiment');
// const sentiment = new Sentiment();
// const result = sentiment.analyze('Cats are stupid!');
// console.log(result);

// let helloText = "say Hi";
// let check = 4;

// if (check > 3) {
//     let hello = "say Hello instead";
//     console.log(hello); // "say Hello instead"
// }

// // console.log(hello); // hello is not defined


// let scores = new Array(5); // creates an array with 5 undefined elements
// let emptyScores = new Array();
// // or
// let scores = ["A+", 95, "C-", 55, 83, 71, "B+"]

// this is an array of strings
// let mountains = ['Everest', 'Fuji', 'Nanga Parbat'];
// console.log(mountains[0]); // 'Everest'
// console.log(mountains[1]); // 'Fuji'
// console.log(mountains[2]); // 'Nanga Parbat'

// console.log(mountains.find(mountain => mountain === 'Fuji')); // 'Fuji'


// //The pop() method is used to remove an element from the end of an array.
// let rivers = ['Mississippi', 'Amazon', 'Nile'];
// let lastRiver = rivers.pop();
// console.log(lastRiver); // Nile
// console.log(rivers); // [ 'Mississippi', 'Amazon' ]

// // The shift() method is used to remove an element from the beginning of an array.
// let firstRiver = rivers.shift();
// console.log(firstRiver); // Mississippi
// console.log(rivers); // [ 'Amazon' ]

// // the indexOf() method is used to find the index of an element in an array.
// let volcanoes = ['Kilimanjaro', 'Fuji', 'Nanga Parbat'];
// let fujiIndex = volcanoes.indexOf('Fuji');
// console.log(fujiIndex); // 1

// // The length property is used to find the number of elements in an array.
// let numVolcanoes = volcanoes.length;
// console.log(numVolcanoes); // 3

// objects in javascript contain keys (or properties) with corresponding values
const user = {
"first_name" : "Sammy",
"last_name" : "Shark",
"age" : 25,
"followers" : 987
}
// we can access properties with dot notation
console.log(user.first_name); // Sammy
console.log(user.age); // 25
// or with array style square bracket syntax
console.log(user["last_name"]); // Shark
user.followers = 988; // we can also assign new values to object properties
user.location = 'Pacific Ocean'; // or create new properties