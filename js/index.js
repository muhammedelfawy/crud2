// ! signUp Elemnts
var adminNameUp = document.getElementById("adminNameUp");
var adminEmailUp = document.getElementById("adminEmailUp");
var adminPasswordUp = document.getElementById("adminPasswordUp");
var adminConfirmPassword = document.getElementById("adminConfirmPassword");
var adminPhoneUp = document.getElementById("adminPhoneUp");
var vEye = document.getElementById("vEye");
var hEye = document.getElementById("hEye");
var hEyeSignIn = document.getElementById("hEyeSignIn");
var vEyeSignIn = document.getElementById("vEyeSignIn");
var signUpBtn = document.getElementById("signUpBtn");
var signUpHero = document.getElementById("signUpHero");
var parent = document.getElementById("parent");
var existingAlert = document.getElementById("existingAlert");
var passwordAlert = document.getElementById("passwordAlert");
var emptyAlert = document.getElementById("emptyAlert");

// ! signIn Elemnts
var adminPasswordIn = document.getElementById("adminPasswordIn");
var adminEmailIn = document.getElementById("adminEmailIn");
var signInBtn = document.getElementById("signInBtn");
var signInHero = document.getElementById("signInHero");
var HomeAdminName = document.getElementById("HomeAdminName");
var correctAlert = document.getElementById("correctAlert");

//* Varibales and local condataions
var nameRegex = /([(\u0600-\u06FF\u0750-\u077F){3,} | [a-z]{3,})/;
var emailRegex = /^[a-zA-Z-0-9]{5,}@[a-z]{4,8}\.[a-z]{2,5}$/;
var passwordRegex = /^[0-9]{6}$/;
var phoneRegex = /^01(0|1|2|5)[0-9]{8}$/;
var adminsList = [];
if (localStorage.getItem("Admins") != null) {
    adminsList = JSON.parse(localStorage.getItem("Admins"));
}
if (localStorage.getItem("HomeAdminName") != null) {
    HomeAdminName.innerHTML = localStorage.getItem("HomeAdminName");
}

//? Functions

//~ Change the type off password to text
function chengeInputTypeToText() {
    adminPasswordUp.setAttribute("type", "text");
    adminConfirmPassword.setAttribute("type", "text");
    adminPasswordIn.setAttribute("type", "text");
    hEye.classList.add("d-none");
    vEye.classList.remove("d-none");
    hEyeSignIn.classList.add("d-none");
    vEyeSignIn.classList.remove("d-none");
}

//~ Change the type off text to password
function chengeInputTypeToPassword() {
    adminPasswordUp.setAttribute("type", "password");
    adminConfirmPassword.setAttribute("type", "password");
    adminPasswordIn.setAttribute("type", "password");
    hEye.classList.remove("d-none");
    vEye.classList.add("d-none");
    hEyeSignIn.classList.remove("d-none");
    vEyeSignIn.classList.add("d-none");
}

//~ Change the posation off sign in form
function signInMoveToUp() {
    signInHero.classList.add("sign-in-hero-move");
    parent.classList.add("h405");
    signUpHero.classList.add("sign-up-hero-move");
    clearInputs();
    correctAlert.classList.add("d-none");
}

//~ Change the posation off sign up form
function signUpMoveToDown() {
    signInHero.classList.remove("sign-in-hero-move");
    parent.classList.remove("h405");
    signUpHero.classList.remove("sign-up-hero-move");
    clearInputs();
    correctAlert.classList.add("d-none");
}

//~ Add New Admin
function addAdmin() {
    if (checkAllEmptyInput() == false) {
        emptyAlert.classList.remove("d-none");
    } else {
        emptyAlert.classList.add("d-none");
        if (
            inputsValidation(nameRegex, adminNameUp) &&
            inputsValidation(emailRegex, adminEmailUp) &&
            inputsValidation(passwordRegex, adminPasswordUp) &&
            inputsValidation(phoneRegex, adminPhoneUp)
        ) {
            if (checkingExistEmailandPhone() == true) {
                existingAlert.classList.remove("d-none");
            } else if (checkingPasswordEquals() != true) {
                passwordAlert.classList.remove("d-none");
            } else {
                existingAlert.classList.add("d-none");
                passwordAlert.classList.add("d-none");
                correctAlert.classList.add("d-none");
                var admin = {
                    adminNameUp: adminNameUp.value,
                    adminEmailUp: adminEmailUp.value,
                    adminPasswordUp: adminPasswordUp.value,
                    adminConfirmPassword: adminConfirmPassword.value,
                    adminPhoneUp: adminPhoneUp.value,
                };
                adminsList.push(admin);
                saveData();
                clearInputs();
                signInMoveToUp();
            }
        }
    }
}

//~ Checking If Admin Exist Or Not
function checkingExistEmailandPhone() {
    for (var i = 0; i < adminsList.length; i++) {
        if (
            adminEmailUp.value == adminsList[i].adminEmailUp ||
            adminPhoneUp.value == adminsList[i].adminPhoneUp
        ) {
            return true;
        } else {
            existingAlert.classList.add("d-none");
        }
    }
}

//~ Checking Password eluqls or not
function checkingPasswordEquals() {
    if (adminPasswordUp.value == adminConfirmPassword.value) {
        return true;
    }
}

//~ Save Data In Local Storage
function saveData() {
    localStorage.setItem("Admins", JSON.stringify(adminsList));
}

//~ Regex Function
function inputsValidation(regexName, inputName) {
    if (regexName.test(inputName.value)) {
        inputName.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        inputName.nextElementSibling.classList.remove("d-none");
        return false;
    }
}

//~ Clear All Inputs
function clearInputs() {
    adminNameUp.value = "";
    adminEmailUp.value = "";
    adminPasswordUp.value = "";
    adminConfirmPassword.value = "";
    adminPhoneUp.value = "";
    adminEmailIn.value = "";
    adminPasswordIn.value = "";
}

//~ checkAllEmptyInput
function checkAllEmptyInput() {
    if (
        adminNameUp.value == "" ||
        adminEmailUp.value == "" ||
        adminPasswordUp.value == "" ||
        adminConfirmPassword.value == "" ||
        adminPhoneUp.value == ""
    ) {
        return false;
    }
}

//~ Login with email or phone number
function logIn() {
    if (adminsList.length == 0) {
        correctAlert.classList.remove("d-none");
    }
    for (var i = 0; i < adminsList.length; i++) {
        if (
            (adminEmailIn.value == adminsList[i].adminEmailUp ||
                adminEmailIn.value == adminsList[i].adminPhoneUp) &&
            adminPasswordIn.value == adminsList[i].adminPasswordUp
        ) {
            correctAlert.classList.add("d-none");
            var adminName = adminsList[i].adminNameUp;
            localStorage.setItem("HomeAdminName", adminName);
            window.location.href = "../home.html";
        } else {
            correctAlert.classList.remove("d-none");
        }
    }
}
