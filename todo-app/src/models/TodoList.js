import { Field } from "model-react";

export default class TodoList {
  constructor(name, items) {
    this.name = new Field(name ?? "");
    this.items = new Field(items ?? []);
  }

  setName(name) {
    this.name.set(name);
  }

  setItems(items) {
    this.items.set(items);
  }

  getName(hook) {
    return this.name.get(hook);
  }

  getItems(hook) {
    return this.items.get(hook);
  }
}
