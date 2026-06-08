//version 1
// const btnStd = document.getElementById("load-student-btn");
// const btnCourses = document.getElementById("load-courses-btn");

//version 2
const btnSubmit = document.getElementById("input");
const studentName = document.getElementById("studentName");
const studentID = document.getElementById("studentID");

const btnClear = document.getElementById("clear-btn");

const status = document.getElementById("status");
const studentData = document.getElementById("student-container");
const courseData = document.getElementById("courses-container");

// /*---------------VERSION 1-------------------*/

// //Data
// const auth = true;

// const student = {
//   name: "tam",
//   program: "Web designer",
//   semester: "Winter",
//   bio: "28 years old",
// };

// const courses = [
//   { code: "WIP2", title: "Web Interface Programming 2" },
//   { code: "AWP", title: "Advanced Programming" },
//   { code: "DB2", title: "Database Management Systems 2" },
// ];

// //Create a Promise to Load Student Data
// function loadStudentData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (auth) {
//         resolve(student);
//       } else {
//         reject("student not found");
//       }
//     }, 1000);
//   });
// }

// //Render Student Data in the DOM
// const renderStudent = function (student) {
//   studentData.innerHTML = `
//     <h3>Student Info:</h3>
//     <p>Student name: ${student.name}</p>
//     <p>Program: ${student.program}</p>
//     <p>Semester: ${student.semester}</p>
//     <p>Bio: ${student.bio}</p>
//   `;
// };

// //Connect the Load Student Button
// btnStd.addEventListener("click", () => {
//   status.textContent = "Loading...";
//   loadStudentData()
//     .then((student) => {
//       renderStudent(student);
//       status.textContent = "Loaded Successfully";
//     })
//     .catch((error) => {
//       studentData.textContent = error;
//     });
// });

// //Create a Promise to Load Course Data
// function getCoursesData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (auth) {
//         resolve(courses);
//       } else {
//         reject("could not retrive course data");
//       }
//     }, 1000);
//   });
// }

// //Render Course Data
// const renderCourses = function (course) {
//   courseData.innerHTML += `<p>Code: ${course.code}, title: ${course.title}</p>`;
// };

// //Connect the Load Courses Button
// btnCourses.addEventListener("click", () => {
//   status.textContent = "Loading...";
//   getCoursesData()
//     .then((courses) => {
//       courseData.innerHTML = "";
//       courseData.innerHTML = `<h3>Cousers</h3>`;
//       courses.forEach((course) => {
//         renderCourses(course);
//       });
//       status.textContent = "Loaded Successfully";
//     })
//     .catch((error) => {
//       courseData.textContent = error;
//       status.textContent = "Error loading data";
//     });
// });

// //Clear Button
// btnClear.addEventListener("click", () => {
//   studentData.innerHTML = "";
//   courseData.innerHTML = "";
//   status.textContent = "Ready.";
// });

//VERSION 2

// Data
const student1 = {
  name: "tam",
  program: "Web designer",
  semester: "Winter",
  bio: "28 years old",
  studentID: 1111,
  courses: [
    { code: "WIP2", title: "Web Interface Programming 2" },
    { code: "AWP", title: "Advanced Programming" },
    { code: "DB2", title: "Database Management Systems 2" },
  ],
};

const student2 = {
  name: "john",
  program: "Fullstack developer",
  semester: "Fall",
  bio: "21 years old",
  studentID: 2222,
  courses: [
    { code: "WIP2", title: "Web Interface Programming 2" },
    { code: "AWP", title: "Advanced Programming" },
    { code: "DB2", title: "Database Management Systems 2" },
  ],
};

const students = [student1, student2];

// Authenticate

const authenticate = function (inputStudentName, inputStudentID) {
  const currentStudent = students.find(
    (student) =>
      student.name.toLowerCase() === inputStudentName.toLowerCase().trim(),
  );

  if (currentStudent?.studentID === Number(inputStudentID)) {
    status.textContent = "Authenticated successfully";
    return currentStudent;
  }
  return null;
};

// Load student
const loadStudent = function (student) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (student) {
        resolve(student);
      } else reject("No data");
    }, 1000);
  });
};

// Render student info and courses
const renderStudent = function (student) {
  const coursesHTML = student.courses
    .map((course) => `<li>${course.code} - ${course.title}</li>`)
    .join("");

  studentData.innerHTML = `
    <h3>Student Info:</h3>
    <p>Student name: ${student.name}</p>
    <p>Program: ${student.program}</p>
    <p>Semester: ${student.semester}</p>
    <p>Bio: ${student.bio}</p>
    <h4>Courses:</h4>
    <ul>${coursesHTML}</ul>
  `;
};

btnSubmit.addEventListener("click", (e) => {
  // e.preventDefault();

  const student = authenticate(studentName.value, studentID.value);

  // ✅ Handle failed auth immediately
  if (!student) {
    status.textContent = "❌ Invalid name or student ID";
    return;
  }
  // ✅ Loading state
  status.textContent = "⏳ Loading...";
  btnSubmit.disabled = true;

  loadStudent(student)
    .then((student) => {
      renderStudent(student);
      status.textContent = "Loaded successfully";
      studentName.value = "";
      studentID.value = "";
    })
    .catch((error) => {
      status.textContent = error || "Error loading data";
    })
    .finally(() => {
      btnSubmit.disabled = false;
    });
});

//Clear Button
btnClear.addEventListener("click", () => {
  studentData.innerHTML = "";
  // courseData.innerHTML = "";
  status.textContent = "Ready.";
});
