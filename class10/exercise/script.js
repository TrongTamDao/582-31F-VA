function Author(name, country) {
  this.name = name;
  this.country = country;
}

Author.prototype.describe = function () {
  return `${this.name} is from ${this.country}`;
};

function Book(title, author, available) {
  this.title = title;
  this.author = author;
  this.available = available;
}

Book.prototype.borrow = function () {
  if (this.available) {
    this.available = false;
    return `${this.title} has been borrowed`;
  }
  return `${this.title} is already borrowed`;
};

Book.prototype.returnBook = function () {
  this.available = true;
  return `${this.title} has been returned`;
};

Book.prototype.displayInfo = function () {
  return `${this.title} by ${this.author} | Available: ${this.available}`;
};

Book.prototype.toggleAvailability = function () {
  this.available = !this.available;
  return `${this.title} availability is now ${this.available}`;
};

Book.prototype.category = "General";
class BookClass {
  constructor(title, author, available = true) {
    this.title = title;
    this.author = author;
    this.available = available;
  }

  displayInfo() {
    return `${this.title} by ${this.author}, Availability: ${this.available}`;
  }
}

const b1 = new BookClass("Clean Code", "Robert C. Martin", true);

console.log(b1.displayInfo());
console.log(b1.hasOwnProperty("title"));
console.log(b1.hasOwnProperty("category"));
console.log(b1.hasOwnProperty("displayInfo"));

console.log(b1.category);
