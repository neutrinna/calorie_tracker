const openPopUpRegistration = document.getElementById(
  "registration__pop-up_open"
);
const closePopUpRegistration = document.getElementById(
  "registration__pop-up_close"
);
const PopUpRegistration = document.getElementById("registration__pop-up");

const openPopUpCustomization = document.getElementById(
  "customization__pop-up_open"
);
const closePopUpCustomization = document.getElementById(
  "customization__pop-up_close"
);
const PopUpCustomization = document.getElementById("customization__pop-up");

function openRegistration() {
  document.getElementById("registration__pop-up").style.display = "block";
}

function closeRegistration() {
  document.getElementById("registration__pop-up").style.display = "none";
}

let sharedData;

function registrationAdd() {
  const nameRegistration = document.getElementById("registration__text_name");
  nameRegistrationValue = nameRegistration.value;
  let nameFirst =
    nameRegistrationValue[0].toUpperCase() + nameRegistrationValue.slice(1);
  console.log(nameFirst);

  const nameCustomization = document.getElementById("customization__name");
  console.log(nameCustomization);
  nameCustomizationValue = nameCustomization.innerText;
  console.log(nameCustomizationValue);
  nameCustomizationValue = nameFirst;
  console.log(nameCustomizationValue);
  console.log(sharedData);
}

function openCustomization() {
  document.getElementById("customization__pop-up").style.display = "block";
  const nameCustomization = document.getElementById("customization__name");
  nameCustomizationValue = nameCustomization.innerText;
  console.log(nameCustomizationValue);
  console.log(sharedData);
}

nameCustomizationValue.innerHTML = sharedData;

function closeCustomization() {
  document.getElementById("customization__pop-up").style.display = "none";
}
