import React from "react";
import ReactDOM from "react-dom";

const element = <h1>Hello World</h1>;
ReactDOM.render(element, document.getElementById("root")); // element to render, and where it shall render it

console.log(element);

// var vs. let vs. const
function sayHello() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  // var is accessible within the whole function
  //   console.log(i); // will see i = 5 if using var, and error if using let.
  // let is only accessible within the block (like every other language.)
}

sayHello();

let person = {
  name: "Mosh",
  walk() {
    console.log(this);
  },
  talk() {},
};

const targetMember = "name";
person["name"] = "John";
person[targetMember] = "Nam";

// this key word.
person.walk(); // will log the person object
const walk = person.walk.bind(person);
// console.log(walk); // will return/log the walk function itself.
walk(); // return undefined....
