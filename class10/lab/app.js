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

const book1 = new Book("Clean Code", "Robert C. Martin", true);
const book2 = new Book("Eloquent JavaScript", "Marijn Haverbeke", false);

const runDemoBtn = document.getElementById("run-demo-btn");
const output = document.getElementById("output");

runDemoBtn.addEventListener("click", () => {
  output.innerHTML = `
    <p>${book1.displayInfo()}</p>
    <p>${book1.borrow()}</p>
    <p>${book1.displayInfo()}</p>
    <p>${book1.toggleAvailability()}</p>
    <hr>
    <p>${book2.displayInfo()}</p>
    <p>${book2.returnBook()}</p>
    <p>${book2.displayInfo()}</p>
    <p>${book1.toggleAvailability()}</p>
    `;
});

console.log(Object.getPrototypeOf(book1) === Book.prototype);
console.log(book1.hasOwnProperty("title"));
console.log(book1.hasOwnProperty("displayInfo"));
console.log(book1.category);
console.log(book2.category);
book1.category = "Programming";
console.log(book1.category);
console.log(book2.category);
