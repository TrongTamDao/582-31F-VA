// Example A — duplicated methods on each object
const student1 = {
  name: "Alice",
  introduce() {
    return `hi, I am ${this.name}`;
  },
};

const student2 = {
  name: "Karim",
  introduce() {
    return `hi, I am ${this.name}`;
  },
};

console.log(student1.introduce());
console.log(student2.introduce());

// Example B — constructor function
function Student(name) {
  this.name = name;
}
// const s1 = new Student("Alice");
// const s2 = new Student("Karim");

// console.log(s1.name);
// console.log(s2.name);

// Example C — shared method through the prototype
Student.prototype.introduce = function () {
  return `Hi, I am ${this.name}`;
};

const s1 = new Student("Alice");
const s2 = new Student("Karim");

console.log(s1.introduce());
console.log(s2.introduce());

// Example D — inspect the relationship
console.log(Object.getPrototypeOf(s1) === Student.prototype);

// Part 3 — Important Concept: Property Lookup

// Example: own property vs prototype method

function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.displayInfo = function () {
  return `${this.name} costs ${this.price}`;
};

const p1 = new Product("Keyboard", 49.99);
console.log(p1.name);
console.log(p1.displayInfo());

// Part 4 — Guided Build
