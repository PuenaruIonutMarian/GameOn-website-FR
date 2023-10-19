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
const radioButtons = document.getElementsByName("location");
const submitButton = document.querySelector('.btn-submit');



// Error Messages
const message = {
    fname: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    lname: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email: "Veuillez renseigner une adresse mail valide.",
    birthdate: "Vous devez entrer votre date de naissance.",
    quantity: "Veuillez entrer le nombre de tournois.",
    city: "Vous devez choisir une ville.",
    conditions: "Vous devez vérifier que vous acceptez les termes et conditions.",
};


//////////////////////   EVENTS  //////////////////////////////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeForm.addEventListener("click", closeModal);

// event listener for first name
firstName.addEventListener("input", validateName);

//event listener for last name
lastName.addEventListener("input", validateName);

// event listener for email
email.addEventListener("input", validateEmail);

// event listener for Birthday
birthdate.addEventListener("input", validateBirthday);

// event listener for Tournaments
quantity.addEventListener("input", validateTournaments);

// event listener for Conditions
checkbox1.addEventListener("change", validateConditions);

// event listener for Submit button
submitButton.addEventListener("click", validateSubmit);


//////////////////////   FUNCTIONS ///////////////////////////

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// function to check if the name is valid 

function validateName(event) {
  const regexName = /^[A-Za-z-]{2,}$/;
  const input = event.target;
  const formDataDiv = input.closest(".formData"); 
  
  if (input.id === "first"){
      if (!regexName.test(input.value)) {
        formDataDiv.setAttribute("data-error", message.fname);
        formDataDiv.setAttribute("data-error-visible", "true");

      } else {
        formDataDiv.removeAttribute("data-error");
        formDataDiv.removeAttribute("data-error-visible");
      }

  } else if (input.id === "last") {
      if (!regexName.test(input.value)) {
        formDataDiv.setAttribute("data-error", message.lname);
        formDataDiv.setAttribute("data-error-visible", "true");
      } else {
        formDataDiv.removeAttribute("data-error");
        formDataDiv.removeAttribute("data-error-visible");
      }
  }
}


// function to check if the email adress is valid
function validateEmail(event) {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const input = event.target;
  const formDataDiv = input.closest(".formData"); 
  
  if (!regexEmail.test(input.value)) {
    formDataDiv.setAttribute("data-error", message.email);
    formDataDiv.setAttribute("data-error-visible", "true");

  } else {
    formDataDiv.removeAttribute("data-error");
    formDataDiv.removeAttribute("data-error-visible");
  }
}


//function to validate the Birthday date
function validateBirthday(event) {
  const input = event.target;
  const formDataDiv = input.closest(".formData");
  const dateStr = input.value;

  // Parse the date
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    // If the parsed date is invalid, set an error message
    formDataDiv.setAttribute("data-error", message.birthdate);
    formDataDiv.setAttribute("data-error-visible", "true");

  } else {
    // Check additional criteria for a valid birthday (e.g., not in the future)
    const today = new Date();
    if (date > today) {
      formDataDiv.setAttribute("data-error", "La date de naissance ne peut pas être dans le futur.");
      formDataDiv.setAttribute("data-error-visible", "true");
    } else {
      // The date is valid
      formDataDiv.removeAttribute("data-error");
      formDataDiv.removeAttribute("data-error-visible");
    }
  }
}


// function to check if the number of participation is valid
function validateTournaments(event) {
  const regexQuantity = /^([0-9]{1,})$/;
  const input = event.target;
  const formDataDiv = input.closest(".formData"); 
  
  if (!regexQuantity.test(input.value)) {
    formDataDiv.setAttribute("data-error", message.quantity);
    formDataDiv.setAttribute("data-error-visible", "true");
  } else {
    formDataDiv.removeAttribute("data-error");
    formDataDiv.removeAttribute("data-error-visible");
  }
}


// Function to validate Locations
function validateLocations() {
  const isAnyRadioChecked = [...radioButtons].some((radioButton) => radioButton.checked);

  if (!isAnyRadioChecked) {
    radioButtons[0].closest(".formData").setAttribute("data-error", message.city);
    radioButtons[0].closest(".formData").setAttribute("data-error-visible", "true");
  } else {
    radioButtons[0].closest(".formData").removeAttribute("data-error");
    radioButtons[0].closest(".formData").removeAttribute("data-error-visible");
  }
}


// Function to validate if the conditions checkbox is checked
function validateConditions(event) {
  const input = event.target;
  const formDataDiv = input.closest(".formData");

  if (checkbox1.checked === false) {
    formDataDiv.setAttribute("data-error", message.conditions);
    formDataDiv.setAttribute("data-error-visible", "true");
  } else {
    formDataDiv.removeAttribute("data-error");
    formDataDiv.removeAttribute("data-error-visible");
  }
}


// Function that checks if the form is valid 
function validateSubmit(event) {
  event.preventDefault();

  // Validate each form field
  validateName({ target: firstName });
  validateName({ target: lastName });
  validateEmail({ target: email });
  validateBirthday({ target: birthdate });
  validateTournaments({ target: quantity });
  validateLocations();
  validateConditions({ target: checkbox1 });

  // Check if any errors are still visible
  let visibleErrors = document.querySelectorAll('[data-error]');

  if (visibleErrors.length === 0) {
    const formulaire = document.querySelector('form');
    formulaire.style.display="none";
    validMessage();
  }
}

// function that display the form validation message
function validMessage() {
  // Target the modal content container
    const mainContent = document.querySelector('.content');

  // Creates an paragraph
  const messageContainer = document.createElement("p");
  // Ads the message
  messageContainer.innerText = "Merci pour votre inscription"; 
  // Apply styles for the message
  messageContainer.style.fontFamily = "DM Sans";
  messageContainer.style.fontSize = "30px";
  messageContainer.style.fontWeight = "400";
  messageContainer.style.lineHeight = "51px";
  messageContainer.style.letterSpacing = "0em";
  messageContainer.style.textAlign = "center";
  messageContainer.style.margin = "233px 140px 246px 125px";
  // Appends the message to the container
  mainContent.appendChild(messageContainer);


  // Creates the new Fermer Button
  const fermerBtn = document.createElement("button");
  fermerBtn.className = "btn-submit fermer-btn";
  fermerBtn.innerText = "Fermer";
  // Center the button
  fermerBtn.style.display = "block";
  fermerBtn.style.margin = "0 auto 18px auto";
  // Appends the button to the container
  mainContent.appendChild(fermerBtn);
    // Add a click event listener to the Fermer button
    fermerBtn.addEventListener("click", function() {
        closeModal();
    });

}