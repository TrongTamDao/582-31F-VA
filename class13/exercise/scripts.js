// 1.
// Create a Book class with:
//  title
//  pages
//  getter summary
//  getter/setter for pages
//  static method isValidPageCount()

class Book {
  constructor(title, pages) {
    this.title = title;
    this.pages = pages;
  }

  static isValidPageCount(pages) {
    return typeof pages === "number" && pages > 0;
  }

  set pages(value) {
    if (Book.isValidPageCount(value)) {
      this.__pages = value;
    } else {
      throw new Error("Invalid page");
    }
  }

  get pages() {
    return this.__pages;
  }

  get summary() {
    return `${this.title} has total of ${this.pages}`;
  }
}

const book = new Book("Harry Porter", 150);
console.log(book.pages);
console.log(book.summary);

// 2.
// Create a BankAccount class with:
//  owner
//  balance
//  getter for balance
//  setter that rejects negative balances
//  static method isValidAmount()

class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  static isValidAmount(value) {
    return typeof value === "number" && value > 0;
  }

  set balance(value) {
    if (BankAccount.isValidAmount(value)) {
      this.__balance = value;
    } else {
      throw new Error("Invalid balance");
    }
  }

  get balance() {
    return this.__balance;
  }
}

const acc1 = new BankAccount("tam", 250);
console.log(acc1.balance);

// 3.
// Create a Course class with:
//  title
//  credits
//  getter label
//  getter/setter for credits
//  static property for schoolName

class Course {
  static schoolName = "Vanier";

  constructor(title, credits) {
    this.title = title;
    this.credit = credit;
  }

  set credit(value) {
    if (value > 0 && typeof value === "number") {
      this.__credit = value;
    } else {
      throw new Error("Credit must be a positive number");
    }
  }

  get credit() {
    return this.__title;
  }

  get label() {
    return `${Course.schoolName} - ${this.title} -  ${this.credit} credit `;
  }
}

// 4.
// Create a class called Movie.
// Code the following:
//  constructor with title and rating
//  getter description that returns something like:
//                                                      "Inception has a rating of 9"

//  getter/setter for rating
//  setter must reject values outside 0–10

//  static method isValidRating(value)

class Movie {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }

  static isValidRating(value) {
    return typeof value === "number" && value >= 0 && value <= 10;
  }
  set rating(value) {
    if (Movie.isValidRating(value)) {
      this.__rating = value;
    } else {
      throw new Error("Invalid rating");
    }
  }

  get rating() {
    return this.__rating;
  }

  get description() {
    return `${this.title} has rating ${this.rating}`;
  }
}

const mov = new Movie("Inception", 10);
console.log(mov.rating);
console.log(mov.description);
