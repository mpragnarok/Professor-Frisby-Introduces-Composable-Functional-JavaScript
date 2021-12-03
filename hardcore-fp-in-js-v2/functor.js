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
  chain: (f) => f(x),
  fold: (f) => f(x),
  toString: () => `Box(${x})`,
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

// Adding Chain for Nested Functor

const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .fold(parseFloat);

const percentToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\%/, ""))
    .map(parseFloat)
    .fold((float) => float * 0.01);

const applyDiscount_ = (price, discount) =>
  Box(moneyToFloat(price)).fold((cents) => Box(percentToFloat(discount)).fold((savings) => cents - cents * savings));

// const moneyToFloat = (str) =>
//   Box(str)
//     .map((str) => str.replace(/\$/, ""))
//     .map(parseFloat);

// const percentToFloat = (str) =>
//   Box(str)
//     .map((str) => str.replace(/\%/, ""))
//     .map(parseFloat)
//     .map((float) => float * 0.01);

// const applyDiscount_ = (price, diㄐscount) =>
//   moneyToFloat(price).fold((cents) => percentToFloat(discount).fold((savings) => cents - cents * savings));

const toFixed_ = (price) => price.toFixed(2);
// const toFixed = (price) => Box(price).map((price) => price.toFixed(2));

const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
    .chain((cents) => Box(percentToFloat(discount)).map((savings) => cents - cents * savings))
    .map(toFixed_)
    .fold((x) => x);

console.log("applyDiscount_", applyDiscount_("$5.00", "20%"));
console.log("applyDiscount", applyDiscount("$5.00", "28%"));
