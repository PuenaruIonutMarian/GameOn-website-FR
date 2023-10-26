// Fonction pour basculer le menu de navigation pour les écrans plus petits
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



// Messages d'erreur
const message = {
    fname: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    lname: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email: "Veuillez renseigner une adresse mail valide.",
    birthdate: "Vous devez entrer votre date de naissance.",
    quantity: "Veuillez entrer le nombre de tournois.",
    city: "Vous devez choisir une ville.",
    conditions: "Vous devez vérifier que vous acceptez les termes et conditions.",
};


//   EVENTS

// Événement pour lancer le formulaire modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Événement pour fermer le formulaire modal
closeForm.addEventListener("click", closeModal);

// Écouteur d'événement pour le champ du prénom
firstName.addEventListener("input", validateName);

// Écouteur d'événement pour le champ du nom de famille
lastName.addEventListener("input", validateName);

// Écouteur d'événement pour le champ de l'adresse e-mail
email.addEventListener("input", validateEmail);

// Écouteur d'événement pour la date de naissance
birthdate.addEventListener("input", validateBirthday);

// Écouteur d'événement pour le nombre de tournois
quantity.addEventListener("input", validateTournaments);

// Écouteur d'événement pour la case à cocher des conditions
checkbox1.addEventListener("change", validateConditions);

// Écouteur d'événement pour le bouton Submit 
submitButton.addEventListener("click", validateSubmit);


//   FUNCTIONS

// Fonction pour lancer le formulaire modal
function launchModal() {
    modalbg.style.display = "block";
}

// Fonction pour fermer le formulaire modal
function closeModal() {
    modalbg.style.display = "none";
}

// Fonction pour créer des messages d'erreur
function createErrorMessage(input, message) {
    const formDataDiv = input.closest(".formData");
    formDataDiv.setAttribute("data-error", message);
    formDataDiv.setAttribute("data-error-visible", "true");
}

// Fonction pour effacer les messages d'erreur
function clearErrorMessage(input) {
    const formDataDiv = input.closest(".formData");
    formDataDiv.removeAttribute("data-error");
    formDataDiv.removeAttribute("data-error-visible");
}


// Fonction pour valider le champ du prénom et du nom de famille
function validateName(event) {
    const regexName = /^[A-Za-z-]{2,}$/;
    const input = event.target;

    if (input.id === "first") {
        if (!regexName.test(input.value)) {
            createErrorMessage(input, message.fname)
        } else {
            clearErrorMessage(input)
        }

    } else if (input.id === "last") {
        if (!regexName.test(input.value)) {
            createErrorMessage(input, message.lname)
        } else {
            clearErrorMessage(input)
        }
    }
}


// Fonction pour valider le champ de l'adresse e-mail
function validateEmail(event) {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const input = event.target;
    if (!regexEmail.test(input.value)) {
        createErrorMessage(input, message.email);
    } else {
        clearErrorMessage(input);
    }
}


// Fonction pour valider la date de naissance
function validateBirthday(event) {
    const input = event.target;
    const formDataDiv = input.closest(".formData");
    const dateStr = input.value;

    // Parse date
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        createErrorMessage(input, message.birthdate);
    } else {
        const today = new Date();
        if (date > today) {
            createErrorMessage(input,"La date de naissance ne peut pas être dans le futur.")
        } else {
            clearErrorMessage(input);
        }
    }
}


// Fonction pour valider les lieux (boutons radio)
function validateTournaments(event) {
    const regexQuantity = /^([0-9]{1,})$/;
    const input = event.target;
    if (!regexQuantity.test(input.value)) {
        createErrorMessage(input, message.quantity);
    } else {
        clearErrorMessage(input);
    }
}


// Function to validate the selected location
function validateLocations() {
    const isAnyRadioChecked = [...radioButtons].some((radioButton) => radioButton.checked);

    if (!isAnyRadioChecked) {
        createErrorMessage(radioButtons[0], message.city);
    } else {
        clearErrorMessage(radioButtons[0]);
    }
}


// Fonction pour valider si la case à cocher des conditions est cochée
function validateConditions(event) {
    const input = event.target;
    if (checkbox1.checked === false) {
        createErrorMessage(input, message.conditions);
    } else {
        clearErrorMessage(input);
    }
}


// Fonction pour valider le formulaire complet
function validateSubmit(event) {
    event.preventDefault();

   // Valider chaque champ du formulaire
    validateName({
        target: firstName
    });
    validateName({
        target: lastName
    });
    validateEmail({
        target: email
    });
    validateBirthday({
        target: birthdate
    });
    validateTournaments({
        target: quantity
    });
    validateLocations();
    validateConditions({
        target: checkbox1
    });

   // Vérifier si des erreurs sont encore visibles
    let visibleErrors = document.querySelectorAll('[data-error]');

    if (visibleErrors.length === 0) {
        const formulaire = document.querySelector('form');
        formulaire.style.display = "none";
        validMessage();
    }
}


// Fonction pour créer un paragraphe de message
function createMessageParagraph(text) {
    const paragraph = document.createElement("p");
    paragraph.style.fontSize = "36px";
    paragraph.style.fontWeight = "400";
    paragraph.style.textAlign = "center";
    paragraph.appendChild(document.createTextNode(text));
    return paragraph;
}


// Fonction qui affiche le message de validation du formulaire
function validMessage() {
   // Paragraphes de message
    const paragraphOne = createMessageParagraph("Merci pour");
    const paragraphTwo = createMessageParagraph("votre inscription");

     // Cibler le conteneur du contenu modal
    const mainContent = document.querySelector('.content');

   // Créer un div pour le conteneur du message
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    // Ajouter les paragraphes au conteneur du message
    messageContainer.appendChild(paragraphOne);
    messageContainer.appendChild(paragraphTwo);

    // Ajouter le conteneur du message au contenu
    mainContent.appendChild(messageContainer);

    // Créer le nouveau bouton "Fermer"
    const fermerBtn = document.createElement("button");
    fermerBtn.className = "btn-submit fermer-btn";
    fermerBtn.innerText = "Fermer";

    // Centrer le bouton
    fermerBtn.style.display = "block";
    fermerBtn.style.margin = "0 auto 18px auto";

    // Ajouter le bouton au conteneur
    mainContent.appendChild(fermerBtn);

   // Ajouter un écouteur d'événement de clic au bouton "Fermer" pour fermer le modal
    fermerBtn.addEventListener("click", function () {
        closeModal();
    });
}

