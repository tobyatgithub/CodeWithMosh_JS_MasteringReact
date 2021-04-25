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
  console.log(i); // will see i = 5
  // let is only accessible within the block (like every other language.)
}

sayHello();

const person = {
  name: "Mosh",
  walk: function () {},
  talk() {},
};

const targetMember = "name";
person.talk();
person["name"] = "John";
person[targetMember.value];

// this key word.
