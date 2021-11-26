// exercise: https://codepen.io/drboolean/pen/OJJOQMx?editors=0010
// solution: https://codepen.io/mp922352612/pen/NWvVKqV?editors=0010
const _ = require("ramda");
const _keepHighest = (x, y) => (x >= y ? x : y);

const curry = (f) => (x) => (y) => f(x, y);

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2); // (2, y) => 2 % y

const result = isOdd(3);
console.log(result);

// TODO: rewrite max in its "simplest" form

const max = function (xs) {
  return _.reduce(
    function (acc, x) {
      return _keepHighest(acc, x);
    },
    0,
    xs,
  );
};

// solution
const maxSimplest = _.reduce(_keepHighest, 0);

console.log("maxSimplest", maxSimplest([1, 5, 3, 1000]));

const slice = _.curry((start, end, xs) => xs.slice(start, end));

const take = slice(0);

console.log(take(2)(["a", "d", "c"]));
