// create array with 5 elements
let McDonaldsOrder = [' Big Mac', ' Kids Meal', ' Chicken Nuggets', ' French Fries', ' McFlurry'];
console.log(`Yeah I'd like to order${McDonaldsOrder}.`);

// replace value at pos 1 and 4
McDonaldsOrder[1] = ' Double Cheeseburger';
McDonaldsOrder[4] = ' Apple Pie';
console.log(`Wait a minute, I meant to order${McDonaldsOrder}..`);

// add a new element at the beginning of the array
McDonaldsOrder.unshift(' Large Coke');
console.log(`Oh and also a${McDonaldsOrder[0]}.`);

// remove the last element of the array
McDonaldsOrder.pop();
console.log(`Actually, I don't want the${McDonaldsOrder[McDonaldsOrder.length - 1]} anymore.`);