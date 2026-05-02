const btnStd = document.getElementById("load-student-btn");
const btnCourses = document.getElementById("load-courses-btn");
const btnClear = document.getElementById("clear-btn");
const status = document.getElementById("status");
const studentData = document.getElementById("student-container");
const courseData = document.getElementById("courses-container");

/*---------------VERSION 1-------------------*/

//Data
const auth = true;

const student = {
  name: "tam",
  program: "Web designer",
  semester: "Winter",
  bio: "28 years old",
};

const courses = [
  { code: "WIP2", title: "Web Interface Programming 2" },
  { code: "AWP", title: "Advanced Programming" },
  { code: "DB2", title: "Database Management Systems 2" },
];

//Create a Promise to Load Student Data
function loadStudentData() {
  return new Promise((resolve, reject) => {
    if (auth) {
      resolve(student);
    } else {
      reject("student not found");
    }
  });
}

//Render Student Data in the DOM
const renderStudent = function (student) {
  studentData.innerHTML = `
    <h3>Student Info:</h3>
    <p>Student name: ${student.name}</p>
    <p>Program: ${student.program}</p>
    <p>Semester: ${student.semester}</p>
    <p>Bio: ${student.bio}</p>
  `;
};

//Connect the Load Student Button
btnStd.addEventListener("click", () => {
  status.textContent = "Loading...";
  setTimeout(() => {
    loadStudentData()
      .then((student) => {
        renderStudent(student);
        status.textContent = "Loaded Successfully";
      })
      .catch((error) => {
        studentData.textContent = error;
      });
  }, 1000);
});

//Create a Promise to Load Course Data
function getCoursesData() {
  return new Promise((resolve, reject) => {
    if (auth) {
      resolve(courses);
    } else {
      reject("could not retrive course data");
    }
  });
}

//Render Course Data
const renderCourses = function (course) {
  courseData.innerHTML += `<p>Code: ${course.code}, title: ${course.title}</p>`;
};

//Connect the Load Courses Button
btnCourses.addEventListener("click", () => {
  status.textContent = "Loading...";
  setTimeout(() => {
    getCoursesData()
      .then((courses) => {
        courseData.innerHTML = "";
        courseData.innerHTML = `<h3>Cousers</h3>`;
        courses.forEach((course) => {
          renderCourses(course);
        });
        status.textContent = "Loaded Successfully";
      })
      .catch((error) => {
        courseData.textContent = error;
        status.textContent = "Error loading data";
      });
  }, 1000);
});

//Clear Button
btnClear.addEventListener("click", () => {
  studentData.innerHTML = "";
  courseData.innerHTML = "";
  status.textContent = "Ready";
});

//VERSION 2
