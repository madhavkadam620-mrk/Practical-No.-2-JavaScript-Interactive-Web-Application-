// Array to store student data

let students = [
    {
        name: "Rahul Patil",
        email: "rahul@gmail.com",
        course: "BTech",
        branch: "Computer Engineering",
        year: "3rd Year"
    },
    {
        name: "Priya Sharma",
        email: "priya@gmail.com",
        course: "BTech",
        branch: "AI & ML",
        year: "2nd Year"
    }
];


// Get HTML elements

const studentForm = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const branchInput = document.getElementById("branch");
const yearInput = document.getElementById("year");

const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");


// Display students when page loads

displayStudents(students);


// Form submit

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseInput.value;
    const branch = branchInput.value;
    const year = yearInput.value;

    let isValid = true;


    // Name validation

    if (name === "") {

        document.getElementById("nameError").textContent =
            "Please enter student name.";

        isValid = false;

    } else if (name.length < 3) {

        document.getElementById("nameError").textContent =
            "Name must contain at least 3 characters.";

        isValid = false;
    }


    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        document.getElementById("emailError").textContent =
            "Please enter email.";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email.";

        isValid = false;
    }


    // Course validation

    if (course === "") {

        document.getElementById("courseError").textContent =
            "Please select a course.";

        isValid = false;
    }


    // Branch validation

    if (branch === "") {

        document.getElementById("branchError").textContent =
            "Please select a branch.";

        isValid = false;
    }


    // Year validation

    if (year === "") {

        document.getElementById("yearError").textContent =
            "Please select your year.";

        isValid = false;
    }


    // If validation fails

    if (!isValid) {
        return;
    }


    // Create student object

    const student = {
        name: name,
        email: email,
        course: course,
        branch: branch,
        year: year
    };


    // Add object to array

    students.push(student);


    // Convert array into JSON

    const jsonData = JSON.stringify(students);

    console.log("Student Data in JSON:");
    console.log(jsonData);


    // Display updated students

    displayStudents(students);


    // Show success message

    document.getElementById("successMessage").textContent =
        "Student registered successfully!";


    // Reset form

    studentForm.reset();

});


// Display students function

function displayStudents(studentList) {

    studentTable.innerHTML = "";


    if (studentList.length === 0) {

        document.getElementById("noStudent").style.display = "block";

        return;

    }


    document.getElementById("noStudent").style.display = "none";


    studentList.forEach(function(student, index) {

        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.branch}</td>
            <td>${student.year}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;


        studentTable.appendChild(row);

    });

}


// Delete student

function deleteStudent(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (confirmDelete) {

        students.splice(index, 1);

        displayStudents(students);

    }

}


// Search student

searchInput.addEventListener("input", function() {

    const searchValue =
        searchInput.value.toLowerCase();


    const filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue) ||
            student.branch.toLowerCase().includes(searchValue)
        );

    });


    displayStudents(filteredStudents);

});


// Clear error messages

function clearErrors() {

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("courseError").textContent = "";
    document.getElementById("branchError").textContent = "";
    document.getElementById("yearError").textContent = "";

    document.getElementById("successMessage").textContent = "";

}