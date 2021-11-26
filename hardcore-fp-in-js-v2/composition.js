import { curry, compose } from "ramda";
// exercise: https://codepen.io/mp922352612/pen/MWvdqpZ?editors=0010

const add = (x, y) => x + y;
const concat = curry((y, x) => x + y);
const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";
const first = (xs) => xs[0];

// const compose = (f, g) => (x) => f(g(x));
// const compose = (x) => exclaim(toUpper(x));

// const shout = compose(exclaim, toUpper);
// const shoutFirst = compose(first, compose(exclaim, toUpper));
// console.log(shoutFirst("tears"));

// ramda compose can have as many arguments as we want
const loudFirst = compose(toUpper, first);

const log = curry((tag, x) => console.log(tag, x));
const shout = compose(exclaim, log("here:"), loudFirst);
// const shout = compose(exclaim,  loudFirst);
// curry + compose --> make a unary function which is a function takes one argument
// const shout = compose(concat("!"), loudFirst);

console.log(shout("tears"));
