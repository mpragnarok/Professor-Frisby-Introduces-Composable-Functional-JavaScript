const Box = (x) => ({
  map: (f) => Box(f(x)),
  inspect: () => `Box(${x})`,
  join: (m) => Box(m).chain((y) => y)(Box(x)),
  chain: (f) => f(x),
  fold: (f) => f(x),
  ap: (b2) => b2.map(x),
});

Box.of = (x) => Box(x);

exports.Box = Box;
