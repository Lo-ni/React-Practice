import { Field } from "model-react";

export default class TodoItem {
  constructor(name, finished) {
    this.name = new Field(name ?? "");
    this.finished = new Field(finished ?? false);
  }

  setName(name) {
    this.name.set(name);
  }

  setFinished(finished) {
    this.finished.set(finished);
  }

  getName(hook) {
    return this.name.get(hook);
  }

  isFinished(hook) {
    return this.finished.get(hook);
  }
}
