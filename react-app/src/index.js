import React from "react";
import ReactDOM from "react-dom";
import { Teacher } from "./Teacher";

const element = <h1>Hello World</h1>;
ReactDOM.render(element, document.getElementById("root")); // element to render, and where it shall render it

console.log(element);

//////////////////////////////////////////////////////
// var vs. let vs. const
//////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////
// this key word.
//////////////////////////////////////////////////////
person.walk(); // will log the person object
const walk = person.walk.bind(person);
console.log(walk); // will return/log the walk function itself.
walk(); // return undefined....

// arrow function
const square = function (number) {
  return number * number;
};
console.log(square(5));

const square2 = (number) => {
  return number * number;
};
console.log(square2(5));

const square3 = (number) => number * number;
console.log(square3(5));

const jobs = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false },
];

// use case example:
const activeJobs = jobs.filter(function (job) {
  return job.isActive;
});

const activeJobs2 = jobs.filter((job) => job.isActive);

console.log(activeJobs);
console.log(activeJobs2);

//////////////////////////////////////////////////////
// arrow function and this
//////////////////////////////////////////////////////
console.log("arrow function and this.");

const newPerson = {
  talk() {
    setTimeout(function () {
      console.log("this", this);
    }, 1000);
  },
};

newPerson.talk(); // you will get a window reference for the talk.
// old way solution is to define a `self = this` outside of the function()
// and than use that as reference

// New way:
console.log("New way of arrow and this.");

const newPerson2 = {
  talk() {
    setTimeout(() => {
      console.log("this", this);
    }, 1000);
  },
};
newPerson2.talk();

//////////////////////////////////////////////////////
//Array and map.
//////////////////////////////////////////////////////
const colors = ["red", "green", "blue"];
// const items = colors.map((color) => {
//   return "<li>" + color + "</li>";
// });
const items = colors.map((color) => `<li>${color}</li>`);
// notice the map here will return a new object.
console.log(items);

//////////////////////////////////////////////////////
// object destructuring
//////////////////////////////////////////////////////
const address = {
  street: "sanmen road",
  city: "shanghai",
  country: "china",
};

// st will be the new alias for the street
const { street: st, city, country } = address;
console.log(`Street: ${st}, city: ${city}, country: ${country}`);

//////////////////////////////////////////////////////
// spread operator
//////////////////////////////////////////////////////
const first = [1, 2, 3];
const second = [4, 5, 6];

// const combined = first.concat(second);
// // ... is the spread and allow you to unpack the list.
// // making it convenient to concat multiple objects and add
// // in new members in the middle.
// const combined2 = [...first, "a", ...second, "b"];

// spread also helps to clone
const clone = [...first];
console.log(first);
console.log(clone);
console.log(second);

const firstProperty = { name: "mosh" };
const secondProperty = { job: "Instructor" };

const combined = { ...firstProperty, ...secondProperty, location: "AU" };
console.log(combined);

//////////////////////////////////////////////////////
// classes
//////////////////////////////////////////////////////

// const John = new Person("John");

const Tom = new Teacher("Tom", "MSc");
Tom.walk();

//////////////////////////////////////////////////////
// Module
//////////////////////////////////////////////////////
