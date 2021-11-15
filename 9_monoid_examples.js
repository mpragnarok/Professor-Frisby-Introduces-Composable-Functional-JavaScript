// TODO: watch "9. A curated collection of Monoids and their uses "
const { List, Map } = require("./immutable-ext");
const { fromNullable } = require("./5_either");
const { Sum, Right } = require("./8_monoids");
const stats = List.of({ page: "Home", views: 40 }, { page: "About", views: 10 }, { page: "Blog", views: 4 });

stats.foldMap((x) => fromNullable(x.views).map(Sum), Right(Sum(0))); // Right(Sum(54))
