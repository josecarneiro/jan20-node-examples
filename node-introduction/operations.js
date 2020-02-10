function mathematicalOperationThatDoesMultiplication(a, b) {
  return a * b;
}

const divide = (a, b) => {
  return a / b;
};

exports.multiply = mathematicalOperationThatDoesMultiplication;

exports.divide = divide;

// To export one value, we use module.exports
// To export multiple value, we use exports.NAME_OF_EXPORTED_VALUE
