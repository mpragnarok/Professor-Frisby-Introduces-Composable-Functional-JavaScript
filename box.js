const Box = (x) => ({
  map: (f) => Box(f(x)),
  [util.inspect.custom]: () => `Box(${x})`,
  join: (m) => Box(m).chain((y) => y)(Box(x)),
  chain: (f) => f(x),
  fold: (f) => f(x),
});

Box.of = (x) => Box(x);

exports.Box = Box;
