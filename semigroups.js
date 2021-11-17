const Sum = (x) => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
});
const Concat = (x) => ({
  x,
  concat: ({ x: y }) => Concat(x.concat(y)),
  inspect: () => `Concat(${x})`,
});

const All = (x) => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`,
});

const First = (x) => ({
  x,
  concat: (_) => First(x),
  inspect: () => `First(${x})`,
});

exports.Sum = Sum;
exports.All = All;
exports.First = First;
exports.Concat = Concat;
