const { Box } = require("./Box");

// Box, Either, Task, List are Monads
// F.of, chain (flatMap, bind, >>=) are creating Monads
// Monads allows us to do nested computation here
// Monad is an applicative functor and a pointed functor
// Reference: [Javascript Functor, Applicative, Monads in pictures](https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221)

// // use map
// httpGet("/user").map((user) => httpGet(`/comments/${user.id}`)); // Task(Task([Comment]))

// // use chain
// httpGet("/user").chain((user) => httpGet(`/comments/${user.id}`)); // Task([Comment])

// // we can add as much as we want
// httpGet("/user").chain((user) => httpGet(`/comments/${user.id}`).chain((comments) => updateDOM(user, comments))); // Task([DOM])

const join = (m) => m.chain((x) => x);
// Box(Box(x)) --> Box(x)

const m = Box(Box(Box(3)));
// join(m.map(join)) == join(join(m));
const res1 = join(m.map(join));
const res2 = join(join(m));

console.log(res1.inspect(), res2.inspect());

const n = Box("wonder");
// join(Box.of(n)) == join(n.map(Box.of));
const res3 = join(Box.of(n));
const res4 = join(n.map(Box.of));

console.log(res3.inspect(), res4.inspect());

// map is definable by `chain` and `of`
// if I have some monad m and I chain a function over it to get its value and run f(x), I can actually put it back in the type with M.of here.
// m.chain(x=>M.of(f(x)))
