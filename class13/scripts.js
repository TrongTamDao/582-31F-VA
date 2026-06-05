// getters, setters, statics

// what is a getter?

// A getter lets an objct expose a value as if it were a property eventhough, the code itself might run behind the screen

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  //a getter function
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const p1 = new Person("Joe", "Doe");
console.log(p1.fullName);

//p1.fullName() will get error

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  //area is not stored directly. it's computed
  get area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(3, 4);
console.log(rect.area);

// why getters are usefull?
// in case, a value should be computed from other values
// in case, (encourage) you want cleaner syntax
// in case, you want to hide implementation details
//************************************************** */
// setter

// a setter lets you control what happens when someone assign a value

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price; // public property
  }

  set price(value) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this.__price = value;
  }

  get price() {
    return this.__price;
  }
}

const product1 = new Product("Keyboard", 49.99);
console.log(product1.price);
product1.price = 60;
console.log(product1.price);

class User {
  static role = "guest";
  constructor(username) {
    this.username = username;
  }

  // setter here allows to have full control over how the alue is being treated and then assigned
  set username(value) {
    this.__username = value.trim();
  }

  get username() {
    return this.__username;
  }
}

const u1 = new User(" t-rex       ");
console.log(u1.username);
console.log(User.role);

class Bug {
  constructor(name) {
    this.name = name;
  }

  set name(value) {
    this.__name = value;
  }

  get name() {
    return this.__name;
  }
}

const bug = new Bug("Hi");
console.log(bug.name);

/**********************STATIC PROPERTIES AND METHOD **********************/

// static members belongs to the class itself, and not to individual objects.

// they're used like: ClassName.member
// and NOT: instance.member

// static methos and properties help us to use in different situations. Mostly used as hellper functions

class MathHelper {
  //add belongs to the class, not any one MathHelper object
  static add(a, b) {
    return a + b;
  }
}

result = MathHelper.add(2, 3);
console.log(result);

/**************PAY ATTENTION***********************/
// const helper = new MathHelper();
// hellper.add(2,3) this would throw an error because the method belong to the class

class Student {
  static counter = 0;

  constructor(name) {
    this.name = name;
    Student.counter += 1;
  }
}

const s1 = new Student("Jane");
const s2 = new Student("Joe");

console.log(`We have a total of ${Student.counter} student`);

class Product2 {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  static isValid(v) {
    return typeof v === "number" && v > 0;
  }

  set price(value) {
    if (Product2.isValid(value)) {
      this.__price = value;
    } else {
      throw new Error("Wrong price");
    }
  }

  get price() {
    return this.__price;
  }
}

newproduct = new Product2("Mouse", 25);
console.log(newproduct.price);
