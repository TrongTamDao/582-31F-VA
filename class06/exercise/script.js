// Ex.1
// given that:

// const jsonText = '{"title":"Web Interface Programming 2","credits":3,"active":true}';
// Task:
// Parse it
// log the object
// log the title
// log the credits

const jsonText =
  '{"title":"Web Interface Programming 2","credits":3,"active":true}';

const parsedjsonText = JSON.parse(jsonText);
console.log(parsedjsonText);
console.log(parsedjsonText.title);
console.log(parsedjsonText.credits);

// Ex.2
// Given that:

// const course = {
// title: "Advanced Programming",
// credits: 3,
// active: true
// };
// Task:
// convert it to JSON text
// log the result
// log the type

const course = {
  title: "Advanced Programming",
  credits: 3,
  active: true,
};

const courseJSON = JSON.stringify(course);
console.log(course);
console.log(courseJSON);
console.log(typeof courseJSON);

// Ex.3
// Task:
// use JSON.stringify() with indentation to display readable JSON in the console. (using ex.2 result)
const string = courseJSON.split(",");
console.log(string);
const prettyCourse = JSON.stringify(course, null, 2);
console.log(prettyCourse);
