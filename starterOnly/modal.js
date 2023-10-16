function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeForm = document.querySelector(".close");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");
const locationRadioBtn = document.querySelectorAll("input[name='location']");

// Error Messages
const message = {
    fname: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    lname: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    email: "Veuillez renseigner une adresse mail valide.",
    birthdate: "Vous devez entrer votre date de naissance.",
    minor: "Vous devez avoir plus de 18 ans pour participer",
    quantity: "Veuillez renseigner un nombre entre 0 et 99",
    city: "Veuillez sélectionner une ville",
    conditions: "Vous devez vérifier que vous acceptez les termes et conditions.",
};

// RegExp
const regexName = /^[A-Za-z-]{2,20}$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexQuantity = /^([0-9]{1,2})$/;

//////////////////////   EVENTS  //////////////////////////////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeForm.addEventListener("click", closeModal);

// first name input event
firstName.addEventListener("input", () => {validerNom(firstName.value)});

// last name input event
lastName.addEventListener("input", () => {validerNom(lastName.value)});

// email input event
email.addEventListener('input', () => {validerEmail(email.value)});


//////////////////////   FUNCTIONS ///////////////////////////

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal(){
  modalbg.style.display = "none";
}


// valider appelation
function validerNom(appelation) {
  if (!regexName.test(appelation)){
    if (appelation === firstName.value) {
      throw new Error(message.fname);
    }
    else if (appelation === lastName.value){
      throw new Error(message.lname);
    }
  }}



// valider email
function validerEmail(email) {
    if (!regexEmail.test(email)) {
        throw new Error(message.email);
    }
}