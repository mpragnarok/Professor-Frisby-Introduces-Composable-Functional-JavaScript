// [Monoids](https://github.com/enricopolanski/functional-programming#modeling-composition-through-monoids)
// Monoid is null safety, we can take as many as possibly we want, even none. And still returns us back something.
const Sum = (x) => ({ x, concat: ({ x: y }) => Sum(x + y), inspect: () => `Sum(${x})` });

// define empty interface
Sum.empty = () => Sum(0);

// const res = Sum.empty().concat(Sum(1).concat(Sum(2)));

const Any = (x) => ({ x, concat: ({ x: y }) => Any(x || y) });
Any.empty = () => Any(false);

const All = (x) => ({ x, concat: ({ x: y }) => All(x && y), inspect: () => `All(${x})` });

All.empty = () => All(true);
// x combines y --> x which is neutral element, just like 0
// true && false --> false
// true && true --> true
// false && true --> true
// false && false --> false

// const res = All(true).concat(All(false)).concat(All.empty());

const Max = (x) => ({ x, concat: ({ x: y }) => Max(x > y ? x : y) });

Max.empty = () => Max(-Infinity);

const Min = (x) => ({ x, concat: ({ x: y }) => Min(x < y ? x : y) });
Min.empty = Min(Infinity);

const Left = (x) => ({ fold: (f, g) => f(x), map: (f) => Left(x), concat: (o) => Left(x) });

const Right = (x) => ({
  fold: (f, g) => g(x),
  map: (f) => Right(f(x)),
  concat: (o) =>
    o.fold(
      (e) => Left(e),
      (r) => Right(x.concat(r)),
    ),
});

const First = (x) => ({ x, concat: (_) => First(x), inspect: () => `First(${x})` }); // can't convert to a monoid, cause we can't find the neutral one

// console.log(res);

const sum = (xs) => xs.reduce((acc, x) => acc + x, 0);

// console.log(sum([1, 2, 3]));

const all = (xs) => xs.reduce((acc, x) => acc && x, true);
// console.log(all([true, true]));

// !semigroup example "first()" here is not null safety
const first = (xs) => xs.reduce((acc, x) => acc);

// console.log(first([])); // TypeError: Reduce of empty array with no initial value

// Examples
// Sum --> Product
const Product = (x) => ({ x, concat: ({ x: y }) => Product(x * y) });

Product.empty = () => Product(1);

// Any -->

exports.Sum = Sum;
exports.Right = Right;
