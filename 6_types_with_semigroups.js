const { Map } = require("immutable");

/**
 * Semigroups
 * > https://github.com/enricopolanski/functional-programming
 * 1. A semigroup is a recipe to combine two, or more, values.
 * 2. A semigroup is an algebra, which is generally defined as a specific combination of:
 * * one or more sets
 * * one or more operations on those sets
 * * zero or more laws on the previous operations
 *
 */

// string
// const res = "a".concat("b").concat("c");
// const res = "a".concat("b".concat("c"));

// array
// const res = [1, 2].concat([3, 4]).concat([5, 6]);
// const res = [1, 2].concat([3, 4].concat([5, 6]));

// 1 + 0 --> 1
// 2 + 0 --> 2
// x + 0 --> x
const Sum = (x) => ({ x, concat: ({ x: y }) => Sum(x + y), inspect: () => `Sum(${x})` });

// const res = Sum(1).concat(Sum(2));

// true && false --> false
// true && true --> true
const All = (x) => ({ x, concat: ({ x: y }) => All(x && y), inspect: () => `All(${x})` });
const res = All(true).concat(All(false));
console.log(res);

const First = (x) => ({ x, concat: (_) => First(x), inspect: () => `First(${x})` });

// const res = First("blah").concat(First("ice cream")).concat(First("third one"));

// examples

const acct1 = Map({ name: First("Nico"), isPaid: All(true), point: Sum(10), friends: ["Franklin"] });
const acct2 = Map({ name: First("Nico"), isPaid: All(false), point: Sum(2), friends: ["Gatsby"] });

const res2 = acct1.concat(acct2);
// toJs(), Converts back to raw JavaScript objects.
console.log(res2.toJS());
