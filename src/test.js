const _ = require("lodash");

let ranges = [
  [{ name: "a" }, { name: "b" }],
  [{ name: "b" }, { name: "c" }],
  [{ name: "d" }, { name: "c" }],
];

console.log(_.unionBy(...ranges, "name"));
