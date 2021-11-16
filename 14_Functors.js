const { Box } = require("./box");
const Task = require("data.task");
const { Either, Right, Left, fromNullable } = require("./either");
const { List, Map } = require("immutable-ext");

/**
 * You have been using Functors!!
 * Functors essentially have a `map` method and must obey few rules:
 * (1) fx.map(f).map(g) = fx.map(g(f))
 * (2) fx.map(id) = id(fx)
 *
 */
// Function composition
const res = Right("squirrels")
  .map((s) => s.substr(5))
  .map((s) => s.toUpperCase());
// === 'squirrels'.substr(5).toUpperCase()
const res1 = Right("squirrels").map((s) => s.substr(5).toUpperCase());
console.log(res.inspect(), res1.inspect());

// fx.map(id) === id(fx)
const id = (x) => x;
const res2 = List.of("crayons").map(id);

const res3 = id(List.of("crayons"));

console.log(res2.inspect(), res3.inspect());
