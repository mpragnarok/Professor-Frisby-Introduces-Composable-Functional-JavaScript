// const Either = Right || Left;

const Right = (x) => ({ map: (f) => Right(f(x)), fold: (f, g) => g(x), inspect: () => `Right(${x})` });
const Left = (x) => ({ map: (f) => Left(x), fold: (f, g) => f(x), inspect: () => `Left(${x})` });
exports.fromNullable = (x) => (x != null ? Right(x) : Left(null));

exports.tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
const result = Right(3)
  .map((x) => x + 1)
  .map((y) => y / 2)
  .fold(
    (x) => "error",
    (x) => x,
  );

console.log(result);
