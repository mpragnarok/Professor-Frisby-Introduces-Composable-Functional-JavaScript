const util = require("util");
const Sum = (x) => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  [util.inspect.custom]: () => `Sum(${x})`,
});

const All = (x) => ({
  x,
  concat: ({ x: y }) => All(x && y),
  [util.inspect.custom]: () => `All(${x})`,
});

const First = (x) => ({
  x,
  concat: (_) => First(x),
  [util.inspect.custom]: () => `First(${x})`,
});

exports.Sum = Sum;
exports.All = All;
exports.First = First;
