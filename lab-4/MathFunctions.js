const num1 = 10;
const num2 = 20;

// Create 4 functions for the 4 main mathematical operations
// (-,+,/,*). Return the calculated value and then output it to the
// screen.

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
// Output the results of the operations
console.log(`Addition: ${add(num1, num2)}`);
console.log(`Subtraction: ${subtract(num1, num2)}`);
console.log(`Multiplication: ${multiply(num1, num2)}`);
console.log(`Division: ${divide(num1, num2)}`);

// Create a function that takes a name as an argument and returns a greeting
function greet(name) {
    return `Hello, ${name}!`;
}

// Output the greeting for my teachers
console.log(greet("Robert"));
console.log(greet("Kaitlin"));