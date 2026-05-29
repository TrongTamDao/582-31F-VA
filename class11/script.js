// Example A — no inheritance, duplicated methods
// function Dog(name) {
//   this.name = name;
// }

// Dog.prototype.speak = function () {
//   return `${this.name} say woof`;
// };

// function Cat(name) {
//   this.name = name;
// }

// Cat.prototype.speak = function () {
//   return `${this.name} says meow`;
// };

// This works, but there is duplication:

// both have name
// both are conceptually animals
// A better design is to create an Animal parent.

// Example B — parent constructor

function Animal(name) {
  this.name = name;
}

Animal.prototype.describe = function () {
  return `This animal is named ${this.name}`;
};

// Now Dog and Cat can inherit from Animal.

// Example C — child constructor: Dog

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Why Animal.call(this, name)?
// This runs the parent constructor in the context of the new Dog object.

// That means Dog gets the parent’s own properties, such as name.

// Example D — connect the prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Now Dog objects can use methods from Animal.prototype.

// Example E — add child-specific method
Dog.prototype.bark = function () {
  return `${this.name} barks loudly`;
};

// Example F — test it
const dog1 = new Dog("Buddy", "Golden Retriever");
console.log(dog1.describe());
console.log(dog1.bark());

// Here:

// describe() is inherited from Animal.prototype
// bark() belongs to Dog.prototype

// Part 3 — Understanding the lookup chain
// When you write:

dog1.describe();

// JavaScript checks:

// 1. does dog1 itself have describe?
// 2. if not, does Dog.prototype have it?
// 3. if not, does Animal.prototype have it?

// Since Animal.prototype has it, JavaScript uses that method.

// That is inheritance through the prototype chain.

// Part 4 — Guided Build
// Build Vehicle and Car

function Cat(name, color) {
  Animal.call(this, name);
  this.color = color;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.meow = function () {
  return `${this.name} meow`;
};

// Part 6 — Modern class syntax
// JavaScript also supports a cleaner syntax for inheritance through class.

// You should know this syntax too.

// Parent class: AnimalClass

class AnimalClass {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `This animal is named ${this.name}`;
  }
}

// Child class: DogClass
class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks`;
  }
}
// Important ideas
// extends sets up inheritance
// super(name) calls the parent constructor
