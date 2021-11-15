const { List, Map } = require("./immutable-ext");
const { Sum } = require("./8_monoids");

const res = List.of(1, 2, 3).foldMap(Sum, Sum.empty()); // Sum(6)
// const res = List.of(1, 2, 3).map(Sum).fold(Sum.empty()); // Sum(6)
// equals to : .reduce((acc, x) => acc.concat(x), Sum.empty());

// const res = Map({ brain: 3, sara: 5 }).map(Sum).fold(Sum.empty());
console.log(res);
