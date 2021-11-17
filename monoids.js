const { Sum, All, Concat } = require("./semigroups.js");

// Promoting Semigroups to Monoids
Sum.empty = () => Sum(0);
All.empty = () => All(true);
Concat.empty = () => Concat("");

exports.Sum = Sum;
exports.All = All;
exports.Concat = Concat;
