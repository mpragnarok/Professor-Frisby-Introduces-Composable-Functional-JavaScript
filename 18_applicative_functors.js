const { Box } = require("./Box");
//              x is a function, Box2 holds a value 2
const res = Box((x) => x + 1).ap(Box(2)); // Box(3)
console.log(res.inspect());
//  Box((x) => (y) => x + y).ap(Box(2)); // Box(y=>2+y)
const res2 = Box((x) => (y) => x + y)
  .ap(Box(2))
  .ap(Box(3)); // Box(5)

console.log(res2.inspect());
