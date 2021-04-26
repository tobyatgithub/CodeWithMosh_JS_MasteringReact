import { Person } from "./Person";

export function promote() {}

// Default -> import ... from ''
// Named -> import { ... } from ''

export default class Teacher extends Person {
  constructor(name, degree) {
    super(name);
    this.degree = degree;
  }

  teach() {
    console.log("teach");
  }
}
