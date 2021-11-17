const add = (x) => (y) => x + y;
const inc = add(1);
const res = inc(2);

console.log(res);

const modulo = (dvr) => (dvd) => dvd & dvr;
const isOdd = modulo(2);
const res2 = isOdd(21);

console.log(res2);

const filter = (pred) => (xs) => xs.filter(pred);

const getAllOdds = filter(isOdd);

const res3 = getAllOdds([1, 2, 3, 4]);

console.log(res3);

const replace = (regex) => (repl) => (str) => str.replace(regex, repl);

const censor = replace(/[aeiou]/gi)("*");

const res4 = censor("hello world");

console.log(res4);

const map = (f) => (xs) => xs.map(f);
const censorAll = map(censor);
const res5 = censorAll(["hello", "world"]);
console.log(res5);
