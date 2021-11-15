const LazyBox = (g) => ({
  map: (f) => LazyBox(() => f(g())),
  fold: (f) => f(g()),
  inspect: () => `LazyBox(${g})`,
});

// LazyBox will be run when .fold() is calling
const result = LazyBox(() => "  64  ")
  .map((abba) => abba.trim())
  .map((trimmed) => new Number(trimmed))
  .map((number) => number + 1)
  .map((x) => String.fromCharCode(x))
  .fold((x) => x.toLowerCase());

console.log(result);
