function openRegistration() {
  document.getElementById("registration__pop-up").style.display = "block";
}

function closeRegistration() {
  document.getElementById("registration__pop-up").style.display = "none";
}

const nameInput = document.getElementById("registration__text_name");
const surnameInput = document.getElementById("registration__text_surname");
const bdayInput = document.getElementById("registration__text_bday");
const emailInput = document.getElementById("registration__text_email");
const passwordInput = document.getElementById("registration__password");
const submitBtn = document.getElementById("registration__submit");

function registrationAdd() {
  const name = nameInput.value;
  const surname = surnameInput.value;
  const bday = bdayInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const userData = {
    name: name,
    surname: surname,
    bday: bday,
    email: email,
    password: password,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
}

submitBtn.addEventListener("click", registrationAdd);

function openCustomization() {
  document.getElementById("customization__pop-up").style.display = "block";

  const userData = JSON.parse(localStorage.getItem("userData"));

  document.getElementById("customization__text_name").value = userData.name;
  document.getElementById("customization__text_surname").value =
    userData.surname;
  document.getElementById("customization__text_bday").value = userData.bday;
  document.getElementById("customization__text_email").value = userData.email;
  document.getElementById("customization__text_password").value =
    userData.password;
}

document
  .getElementById("customization__open")
  .addEventListener("click", openCustomization);

function closeCustomization() {
  document.getElementById("customization__pop-up").style.display = "none";
}
