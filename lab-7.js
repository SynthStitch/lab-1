const num1 = 10;
const num2 = 20;

// Create 4 functions for the 4 main mathematical operations
// (-,+,/,*). Return the calculated value and then output it to the
// screen.


// this functionwill add two numbers
function add(a, b) {
    return a + b;
}

// this function will subtract two numbers
function subtract(a, b) {
    return a - b;
}

// this function will multiply two numbers
function multiply(a, b) {
    return a * b;
}

// this function will divide two numbers    
function divide(a, b) {
    return a / b;
}

// create the test
if (add(num1, num2) !== 30) {
    console.error("Addition function failed");
}   
if (subtract(num1, num2) !== -10) {
    console.error("Subtraction function failed");
}
if (multiply(num1, num2) !== 200) {
    console.error("Multiplication function failed");
}
if (divide(num1, num2) !== 0.5) {
    console.error("Division function failed");
}


// Output the results of the 4 functions to the screen
console.log("Addition: " + add(num1, num2));
console.log("Subtraction: " + subtract(num1, num2));
console.log("Multiplication: " + multiply(num1, num2)); 
console.log("Division: " + divide(num1, num2));

