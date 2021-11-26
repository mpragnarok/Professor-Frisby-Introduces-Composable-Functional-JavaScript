const Box = x => ({
  map: f => Box(f(x)),
  inspect: () => `Box(${x})`,
  join: m => Box(m).chain(y => y)(Box(x)),
  chain: f => f(x),
  fold: f => f(x),
  ap: b2 => b2.map(x),
});
Box.of = x => Box(x);

exports.Box = Box;

/**
 *`ap` represents applicative functor
 * Which can let you curried function and applying function to the Values in `ap`
 * 
 * const res = Box((x) => x + 1).ap(Box(2)); // Box(3)
 * const res2 = Box((x) => (y) => x + y)
  .ap(Box(2))
  .ap(Box(3)); // Box(5)
 * 
 * const liftAp = (f, fx, fy) => fx.map(f).ap(fy);
 * const res3 = liftA2(add, Box(2), Box(3)); // Box(5)
 */
