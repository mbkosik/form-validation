const send = document.getElementById("send");
const clear = document.getElementById("clear");
const close = document.querySelector(".close");

const inputs = [...document.querySelectorAll(".form-data")];
const password = document.getElementById("password");
const passwordRepeat = document.getElementById("password-repeat");
const email = document.getElementById("email");

const registerBox = document.querySelector(".register");
const popup = document.querySelector(".popup");
const registerForm = document.querySelector(".register__form");

const errorText = document.createElement("p");
let condition = false; 

function checkForm() {
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            return displayError("Uzupełnij puste pola");
        } 
    } 

    for (i = 0; i < inputs.length; i++) {
        let min = 5;
        if (inputs[i].value.length < min) {
            let msg = `Dane powinny mieć ponad ${min} znaków`;
            return displayError(msg);
        }
    } 

    if (password.value !== passwordRepeat.value) {
        return displayError("Popraw hasło");
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTest = regex.test(email.value);

    if (regexTest === false) {
        return displayError("E-mail jest niepoprawny");
    }
}

function clearForm() {
    inputs.forEach((input) => {
        input.value = "";
    })
}

function submitForm(e) {
    e.preventDefault(); 
    resetError(); 
    checkForm();
    if (condition === false) { 
        popup.classList.add("show-popup")
    };
    clearForm();
}

function closePopUp() {
    popup.classList.remove("show-popup");
}

function displayError(msg) {
    errorText.classList.add("error-text");
    registerForm.appendChild(errorText);
    errorText.textContent = msg;
    registerBox.classList.add("error");
    setTimeout(function() { 
        registerBox.classList.remove("error"); 
    }, 2000)
    condition = true; 
}

function resetError() {
    if (condition === true) {
        document.querySelector("p.error-text").remove(); 
        condition = false; 
    }
}

send.addEventListener("click", submitForm); 
clear.addEventListener("click", clearForm);
close.addEventListener("click", closePopUp);