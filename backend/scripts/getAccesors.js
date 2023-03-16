const { User } = require("../models/index.js");

const model = User;
for (let assoc of Object.keys(model.associations)) {
  for (let accessor of Object.keys(model.associations[assoc].accessors)) {
    console.log(
      "test modela",
      model.name + "." + model.associations[assoc].accessors[accessor] + "()"
    );
  }
}
