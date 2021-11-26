const Left = x => ({
  ap: fx => fx.map(x),
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
  concat: o => Left(x),
});
Left.of = x => Left(x);

const Right = x => ({
  ap: fx => fx.map(x),
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
  concat: o =>
    o.fold(
      e => Left(e),
      r => Right(x.concat(r))
    ),
});
Right.of = x => Right(x);

const Either = x => (x ? Right(x) : Left(null));
Either.of = Right.of;

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const getKeys = object => Object.keys(object);
const findObjProperty = object => name => Either(object[name]);
const findObjKeyByFunc = object => fn => Either(fn(getKeys(object)));

module.exports = { Either, tryCatch, findObjProperty, findObjKeyByFunc };
