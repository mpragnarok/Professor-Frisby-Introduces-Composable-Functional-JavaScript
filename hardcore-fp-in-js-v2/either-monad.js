// Either Monad

// Exercises: https://codepen.io/drboolean/pen/xgoeWR?editors=0010

const findColor_ = (name) => ({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

const res = findColor_("red").toUpperCase(); // #FF4444
// const res = findColor("redd").toUpperCase(); // Cannot read property 'toUpperCase' of undefined
// console.log(res);
const logIt = (x) => {
  console.log(x);
  return x;
};
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
});

const findColor_2 = (name) => {
  const found = { red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name];
  return found ? Right(found) : Left("dunno");
};
const RightRes = findColor_2("red");
const LeftRes = findColor_2("redd");

// console.log(RightRes.inspect); // Right(#ff4444)
// console.log(LeftRes.inspect); // Left(dunno)

// Add Right and Left
const result = (color) =>
  findColor_2(color)
    .map((x) => x.toUpperCase())
    // .map((x) => x.slice(1))
    .fold(
      (error) => "#000000",
      (color) => color,
    );
// console.log(result("red")); // #FF4444
// console.log(result("redd")); // #000000

// Define fromNullable
const fromNullable = (x) => (x ? Right(x) : Left());

const findColor = (name) =>
  fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name])
    .map((x) => x.toUpperCase())
    .fold(
      (error) => "dunno",
      (color) => color,
    );

// console.log(findColor("red"));
// console.log(findColor("redd"));

// Refactoring with Either Monad
const fs = require("fs");

// const getPort_ = () => {
//   try {
//     const str = fs.readFileSync("`${__dirname}/config.json");
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     console.log(e);
//     return 3000;
//   }
// };
// console.log(getPort_());
// Add try catch either

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const getPort_2 = () =>
  tryCatch(() => fs.readFileSync(`${__dirname}/config.json`))
    .map((contents) => JSON.parse(contents))
    .map((config) => config.port)
    .fold(
      (e) => 8080,
      (x) => x,
    );
const getPortResult = getPort_2();
console.log(getPortResult);

// Flatten with Chain

const readFileSync = (path) => tryCatch(() => fs.readFileSync(path));
const parseJSON = (contents) => tryCatch(() => JSON.parse(contents));

const getPort = (path) =>
  readFileSync(path) // Right('')
    // .map(parseJSON) // Right(Right({}))
    .chain(parseJSON) // Right({})
    .map((config) => config.port)
    .fold(
      (e) => 8080,
      (x) => x,
    );
console.log(getPort(`${__dirname}/config.json`));

// Exercises: https://codepen.io/drboolean/pen/xgoeWR?editors=0010

// Solutions: https://codepen.io/mp922352612/pen/YzrzeGy?editors=0010
const user = { address: { street: { name: "Willow" } } };

const streetName_ = (user) => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
  }

  return "no street";
};

const streetName = (user) =>
  fromNullable(user)
    .chain((user) => fromNullable(user.address))
    .chain((address) => fromNullable(address.street))
    .map((street) => street.name)
    .fold(
      (e) => "no street",
      (name) => name,
    );

console.log(streetName(user));

// Debugging

console.log(String(Right(2)));

const streetNameDebug = (user) =>
  logIt(fromNullable(user))
    .chain((user) => fromNullable(user.address))
    .map(logIt) // { street: { name: 'Willow' } }
    .chain((address) => fromNullable(address.street))
    .map(logIt) // { name: 'Willow' }
    .map((street) => street.name)
    .fold(
      (e) => "no street",
      (name) => name,
    );
console.log(streetNameDebug(user));
