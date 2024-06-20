//! HTML Elemnts
var studentName = document.getElementById("studentName");
var studentEmail = document.getElementById("studentEmail");
var studentPhone = document.getElementById("studentPhone");
var registrationDate = document.getElementById("registrationDate");
var routeLocation = document.getElementById("routeLocation");
var deplomaName = document.getElementById("deplomaName");
var remainingAmount = document.getElementById("remainingAmount");
var amountPaid = document.getElementById("amountPaid");
var emptyInputsAlert = document.getElementById("emptyInputsAlert");
var parentHtml = document.getElementById("parentHtml");
var updataStudentData = document.getElementById("updataStudentData");
var addStudentBtn = document.getElementById("addStudentBtn");
var searchInput = document.getElementById("searchInput");

//* Varibales and local condataions
var studentNameRegex = /([(\u0600-\u06FF\u0750-\u077F){3,} | [a-z]{3,})/;
var studentEmailRegex = /^[a-zA-Z-0-9]{5,}@[a-z]{4,8}\.[a-z]{2,5}$/;
var studentPhoneRegex = /^01(0|1|2|5)[0-9]{8}$/;
var deplomaPrice = 0;
var updatedIndex = -1;
var studentList = JSON.parse(localStorage.getItem("students")) || [];
displayAllStudents();

//? Function

// ~ Calc The RemainingAmount
function clacRemainingAmount() {
  if (deplomaName.value === "Front End") {
    deplomaPrice = 4000;
    remainingAmount.value = deplomaPrice;
  } else if (deplomaName.value === "Back End") {
    deplomaPrice = 5000;
    remainingAmount.value = deplomaPrice;
  } else if (deplomaName.value === "UI / UX") {
    deplomaPrice = 4500;
    remainingAmount.value = deplomaPrice;
  } else if (deplomaName.value === "Full Stack") {
    deplomaPrice = 7000;
    remainingAmount.value = deplomaPrice;
  }
  remainingAmount.value = deplomaPrice - amountPaid.value;
}

// ~ Check All Inputs if they are impty
function checkAllInputs() {
  if (
    studentName.value === "" ||
    studentEmail.value === "" ||
    studentPhone.value === "" ||
    registrationDate.value === "" ||
    remainingAmount.value === "" ||
    amountPaid.value === "" ||
    routeLocation.value === "فرع" ||
    deplomaName.value === "الدبلومه"
  ) {
    return false;
  }
}

// ~ Add Stedudent
function AddStudent() {
  if (checkAllInputs() == false) {
    emptyInputsAlert.classList.remove("d-none");
  } else if (
    inputsValidation(studentNameRegex, studentName) &&
    inputsValidation(studentEmailRegex, studentEmail) &&
    inputsValidation(studentPhoneRegex, studentPhone)
  ) {
    emptyInputsAlert.classList.add("d-none");
    var student = {
      nameOfStudent: studentName.value,
      emailOfEmail: studentEmail.value,
      PhoneOfStudent: studentPhone.value,
      registrationOfDate: registrationDate.value,
      locationOfRoute: routeLocation.value,
      nameOfDeploma: deplomaName.value,
      PaidOfAmount: amountPaid.value,
      remainingOfAmount: remainingAmount.value,
    };
    studentList.push(student);
    saveDataInLocalStoreg();
    displayStudents(studentList.length - 1);
    clearAllInputs();
  }
}

// ~ Save in local storage
function saveDataInLocalStoreg() {
  localStorage.setItem("students", JSON.stringify(studentList));
}

// ~ Display Last Student in the Array
function displayStudents(index) {
  var studntTable = `<tr>
  <td class="py-4">${studentList[index].nameOfStudent}</td>
  <td class="py-4">${studentList[index].emailOfEmail}</td>
  <td class="py-4">${studentList[index].PhoneOfStudent}</td>
  <td class="py-4">${studentList[index].registrationOfDate}</td>
  <td class="py-4">${studentList[index].locationOfRoute}</td>
  <td class="py-4">${studentList[index].nameOfDeploma}</td>
  <td class="py-4">${studentList[index].PaidOfAmount}</td>
  <td class="py-4">${studentList[index].remainingOfAmount}</td>
  <td class="py-4">
    <i 
      class="fs-4 fa-regular fa-pen-to-square text-success ms-3"
      onclick="getDataToUpdata(${index})"
    ></i>
    <i class="fs-4 fa-solid fa-trash-can text-danger"
    onclick="deleteStudent(${index})"></i>
  </td>
</tr>`;
  parentHtml.innerHTML += studntTable;
}

// ~ Display All Students in the Array
function displayAllStudents() {
  for (var i = 0; i < studentList.length; i++) {
    displayStudents(i);
  }
}

// ~ Get Data from local storage to inputs filds
function getDataToUpdata(i) {
  updatedIndex = i;
  updataStudentData.classList.remove("d-none");
  addStudentBtn.classList.add("d-none");
  studentName.value = studentList[i].nameOfStudent;
  studentEmail.value = studentList[i].emailOfEmail;
  studentPhone.value = studentList[i].PhoneOfStudent;
  registrationDate.value = studentList[i].registrationOfDate;
  routeLocation.value = studentList[i].locationOfRoute;
  deplomaName.value = studentList[i].nameOfDeploma;
  amountPaid.value = studentList[i].PaidOfAmount;
  remainingAmount.value = studentList[i].remainingOfAmount;
}

// ~ Updata Student Data
function updataStudent() {
  if (checkAllInputs() == false) {
    emptyInputsAlert.classList.remove("d-none");
  } else if (
    inputsValidation(studentNameRegex, studentName) &&
    inputsValidation(studentEmailRegex, studentEmail) &&
    inputsValidation(studentPhoneRegex, studentPhone)
  ) {
    emptyInputsAlert.classList.add("d-none");
    updataStudentData.classList.add("d-none");
    addStudentBtn.classList.remove("d-none");
    studentList[updatedIndex].nameOfStudent = studentName.value;
    studentList[updatedIndex].emailOfEmail = studentEmail.value;
    studentList[updatedIndex].PhoneOfStudent = studentPhone.value;
    studentList[updatedIndex].registrationOfDate = registrationDate.value;
    studentList[updatedIndex].locationOfRoute = routeLocation.value;
    studentList[updatedIndex].nameOfDeploma = deplomaName.value;
    studentList[updatedIndex].PaidOfAmount = amountPaid.value;
    studentList[updatedIndex].remainingOfAmount = remainingAmount.value;
    saveDataInLocalStoreg();
    parentHtml.innerHTML = "";
    displayAllStudents();
    clearAllInputs();
  }
}

// ~ Delete Student from the table form
function deleteStudent(i) {
  studentList.splice(i, 1);
  saveDataInLocalStoreg();
  parentHtml.innerHTML = "";
  displayAllStudents();
}

//~ Regex
function inputsValidation(studentRegexName, studentInputName) {
  if (studentRegexName.test(studentInputName.value)) {
    studentInputName.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    studentInputName.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

//~ Search by Name and Email
function searchStudents() {
  parentHtml.innerHTML = "";

  var fillterdAreay = [];
  for (var i = 0; i < studentList.length; i++) {
    if (
      studentList[i].nameOfStudent.includes(searchInput.value) ||
      studentList[i].PhoneOfStudent.includes(searchInput.value)
    ) {
      fillterdAreay.push(studentList[i]);
      displayStudents(i);
    }
  }
}

//~ Clear All inputs data
function clearAllInputs() {
  studentName.value = "";
  studentEmail.value = "";
  studentPhone.value = "";
  registrationDate.value = "";
  remainingAmount.value = "";
  amountPaid.value = "0";
  routeLocation.value = "فرع";
  deplomaName.value = "الدبلومه";
}

//~ Log Out
function logOut() {
  window.location.href = "../index.html";
}
