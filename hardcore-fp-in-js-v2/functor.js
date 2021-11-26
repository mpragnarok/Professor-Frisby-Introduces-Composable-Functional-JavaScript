const nextCharForNumberString_ = (str) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed, 10);
  const nextNumber = new Number(number + 1);
  return String.fromCharCode(nextNumber);
};

// const result = nextCharForNumberString("  64 ");

// Identity functor: Box
const Box = (x) => ({
  map: (f) => Box(f(x)), // Run the `function` on the `x` and keep it in the `Box`, So we can continue to chain
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});

const result = () =>
  ["a"] // ["a"]
    .map((x) => x.toUpperCase()) // ["A"]
    .map((x) => String.fromCharCode(x)); //  ['\u0000']

const boxResult = () =>
  Box("a") // Box("a")
    .map((x) => x.toUpperCase()) // Box("A")
    .map((x) => String.fromCharCode(x)); //  Box('\u0000')

console.log(boxResult());

// refactor nextCharForNumberString
const nextCharForNumberString = (str) =>
  Box(str)
    .map((s) => s.trim())
    .map((trimmed) => parseInt(trimmed, 10))
    .map((number) => new Number(number + 1))
    .fold((number) => String.fromCharCode(number));

// const increment = (number) => new Number(number + 1);
// const nextCharForNumberString = (str) =>
//   Box(str)
//     .map((s) => s.trim())
//     .map(parseInt)
//     .map(increment)
//     .fold(String.fromCharCode)

console.log("nextCharForNumberString_", nextCharForNumberString_("  64 "));
console.log("nextCharForNumberString", nextCharForNumberString("  64 "));

// Box captures composition
const compose = (f, g) => (x) => Box(x).map(g).fold(f);

const first = (xs) => xs[0];

const halfTheFirstLargeNumber_ = (xs) => {
  const found = xs.filter((x) => x >= 20);
  const answer = first(found) / 2;

  return `The answer is ${answer}`;
};

const halfTheFirstLargeNumber = (xs) =>
  Box(xs)
    .map((xs) => xs.filter((x) => x >= 20))
    .map((found) => first(found) / 2)
    .fold((answer) => `The answer is ${answer}`);

const res = halfTheFirstLargeNumber([1, 4, 50]);

console.log(res); // The answer is 25

// Practices: https://codepen.io/drboolean/pen/poodxOm?editors=0010
// Solution: https://codepen.io/mp922352612/pen/GRvVJOx?editors=0010

// Nested Functor
