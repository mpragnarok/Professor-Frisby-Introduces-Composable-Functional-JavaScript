const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});
const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
const findColor = (name) => fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

// const result = findColor("green")
//   .map((color) => color.slice(1))
//   .fold(
//     (e) => `Return ${e} which is no color`,
//     (color) => color.toUpperCase(),
//   );
// console.log(result);

const fs = require("fs");

// const getPort = () => {
//   try {
//     const str = fs.readFileSync("config.json");
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };

const getPort = () =>
  tryCatch(() => fs.readFileSync("config.json")) // Right('')
    .chain((c) => tryCatch(() => JSON.parse(c))) // Right('')
    .fold(
      (e) => 3000,
      (c) => c.port,
    );

const result = getPort();

console.log(result);

const current_user = false;

const showLogin = () => "login page";
const renderPage = () => "render page";
const openSite = () => fromNullable(current_user).fold(showLogin, renderPage);

console.log(openSite());

const user = {
  premium: true,
  preferences: { language: "en", timezone: "America/New_York" },
  address: { street: { name: "abc street" } },
};
const defaultPrefs = { language: "zh-tw", timezone: "Asia/Taipei" };

const loadPrefs = (prefs) => prefs; //load prefs

const getPrefs = (user) =>
  (user.premium ? Right(user) : Left("not premium"))
    .map((u) => u.preferences)
    .fold(
      () => defaultPrefs,
      (prefs) => loadPrefs(prefs),
    );
console.log(getPrefs(user));

const streetName = (user) =>
  fromNullable(user.address)
    .chain((a) => fromNullable(a.street))
    .map((s) => s.name)
    .fold(
      (e) => "no street",
      (n) => n,
    );
console.log(streetName(user));

const concatUniq = (x, ys) =>
  fromNullable(
    ys.filter((y) => y === x)[0], // does it has any element is duplicated?
  ).fold(
    () => ys.concat(x),
    (y) => y,
  );

console.log(concatUniq(1, [5, 1, 1])); // not uniq
console.log(concatUniq(2, [5, 1, 1])); //  uniq

const readFile = (x) => tryCatch(() => fs.readFileSync(x, "utf8"));
const parseJson = (json) => tryCatch(() => JSON.parse(json));

const example = { previePath: "./example.json" };
const wrapExample = (example) =>
  fromNullable(example.previewPath)
    .chain(readFile)
    .chain((file) => parseJson(file))
    .fold(
      () => example,
      (ex) => Object.assign({ preview: "p" }, ex),
    );
console.log(wrapExample(example));

const dbConfig = readFile("config.json").fold(
  (e) => null,
  (config) => config,
);
const parseDbUrl = (cfg) =>
  tryCatch(() => JSON.parse(cfg))
    .chain((c) => fromNullable(c.url))
    .fold(
      (e) => null,
      (u) => u.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/),
    );

console.log("dbConfig", dbConfig);
console.log(parseDbUrl(dbConfig));
