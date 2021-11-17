const { List, Map } = require("./immutable-ext");
const { Sum, Concat } = require("./monoids");

// TODO: watch 10
const res = List.of(1, 2, 3).foldMap(Sum, Sum.empty()); // Sum(6)
// const res = List.of(1, 2, 3).map(Sum).fold(Sum.empty()); // Sum(6)
// equals to : .reduce((acc, x) => acc.concat(x), Sum.empty());

const res2 = Map({ brain: 3, sara: 5 }).map(Sum).fold(Sum.empty());
console.log(res2.inspect());

const res3 = Map({ firstName: "Mina", lastName: "Huang" }).foldMap(Concat, Concat.empty());
console.log(res3.inspect());

const res4 = List.of("Mina", "San", "Huang").foldMap(Concat, Concat.empty());
console.log(res4.inspect());
