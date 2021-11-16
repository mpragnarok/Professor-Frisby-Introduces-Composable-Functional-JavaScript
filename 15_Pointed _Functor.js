const { Box } = require("./box");
const { Either } = require("./either");
const Task = require("data.task");

Task.of("hello"); // Task('hello')
// equals: new Task((res, res)=> res('hello'))

Either.of("hello"); // Right('hello')

Box.of(100); // Box(100)
