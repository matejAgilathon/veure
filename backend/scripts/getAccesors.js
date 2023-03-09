import { User } from "../models/user.js";

const model = User;
console.log("prije for petlje");
for (let assoc of Object.keys(model.associations)) {
  for (let accessor of Object.keys(model.associations[assoc].accessors)) {
    console.log(
      "test modela",
      model.name + "." + model.associations[assoc].accessors[accessor] + "()"
    );
  }
}
