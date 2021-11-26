const util = require("util");
const { List, Map } = require("./immutable-ext");
const { Either, Left } = require("./Either");
const { All } = require("./Semigroups");
const { Sum, Right } = require("./8_monoids");
const { compose } = require("./common");

// Examples
// Sum --> Product
const Product = (x) => ({ x, concat: ({ x: y }) => Product(x * y) });

Product.empty = () => Product(1);

const stats = List.of({ page: "Home", views: 40 }, { page: "About", views: 10 }, { page: "Blog", views: 4 });
stats.foldMap((x) => Either(x.views).map(Sum), Right(Sum(0))); // Right(Sum(54))

const First = (either) => ({
  fold: (f) => f(either),
  concat: (o) => (either.isLeft ? o : First(either)),
  [util.inspect.custom]: () => `First(${x})`,
});

First.empty = () => First(Left());

const find = (xs, f) =>
  List(xs)
    .foldMap((x) => First(f(x) ? Right(x) : Left()), First.empty())
    .fold((x) => x);

const res = find([3, 4, 5, 6, 7], (x) => x > 4);

console.log(res);
// Right(5)

const Fn = (f) => ({ fold: f, concat: (o) => Fn((x) => f(x).concat(o.fold(x))) });

const hasVowels = (x) => !!x.match(/[aeiou]/gi);
const longWord = (x) => x.length >= 5;
const both = Fn(compose(All, hasVowels)).concat(Fn(compose(compose(All, longWord))));

const res2 = [("gym", "bird", "lilac")].filter((x) => both.fold(x).x);
console.log(res2);
// [lilac]

const Pair = (x, y) => ({
  x,
  y,
  concat: ({ x: x1, y: y1 }) => Pair(x.concat(x1), y.concat(y1)),
  [util.inspect.custom]: () => `Pair(${x}, ${y})`,
});
