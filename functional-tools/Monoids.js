const { Sum, All, Concat } = require('./Semigroups');

// Promoting Semigroups to Monoids
Sum.empty = () => Sum(0);
All.empty = () => All(true);
Concat.empty = () => Concat('');

const ConcatArr = Concat;
ConcatArr.empty = () => Concat([]);

module.exports = {
  Sum,
  All,
  Concat,
  ConcatArr,
};
