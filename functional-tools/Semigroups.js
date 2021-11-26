export const Sum = x => ({
  value: x,
  concat: ({ value: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
});
export const Concat = x => ({
  value: x,
  concat: ({ value: y }) => Concat(x.concat(y)),
  inspect: () => `Concat(${x})`,
});

export const All = x => ({
  value: x,
  concat: ({ value: y }) => All(x && y),
  inspect: () => `All(${x})`,
});
