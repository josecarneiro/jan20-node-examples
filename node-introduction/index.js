const sum = require('./sum');

console.log(sum(1, 2));
console.log(sum(3, 4));

console.log(sum(3, 'a'));

const mathematicalOperations = require('./operations');

console.log(mathematicalOperations.multiply(5, 5));

const subtract = require('./subtract');

console.log(subtract(10, 5));

const chalk = require('./node_modules/chalk');

console.log(chalk.white.bgGreen('Hello World!'));
