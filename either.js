const util = require("util");
const Left = (x) => ({
  ap: (fx) => fx.map(x),
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  concat: (o) => Left(x),
  inspect: () => `Left(${x})`,
});
Left.of = (x) => Left(x);

const Right = (x) => ({
  ap: (fx) => fx.map(x),
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
  concat: (o) =>
    o.fold(
      (e) => Left(e),
      (r) => Right(x.concat(r)),
    ),
});

Right.of = (x) => Right(x);

const Either = (x) => (x ? Right(x) : Left(null));

Either.of = Right.of;
// Cause we want to .map after using .of(), it's impossible to use .map after a Left.of
// Either.of('hello').map(x=>x+'!')

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
module.exports = {
  Left,
  Right,
  tryCatch,
  Either,
};
