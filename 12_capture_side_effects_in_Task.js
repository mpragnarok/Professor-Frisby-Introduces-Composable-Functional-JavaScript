const Task = require("data.task");

// // Task(1)
// Task.of(1)
//   .map((x) => x + 1)
//   .chain((x) => Task.of(x + 1))
//   .fork(
//     (e) => console.log("err", e),
//     (x) => console.log("success", x),
//   );

const launchMissiles = () =>
  new Task((rej, res) => {
    console.log("launch missiles!");
    res("missile");
  });

const app = launchMissiles().map((x) => x + "!");
app
  .map((x) => x + "!")
  .fork(
    (e) => console.log("err", e),
    (x) => console.log("success", x),
  );
