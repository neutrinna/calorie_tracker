const openPopUpRegistration = document.getElementById(
  "registration__pop-up_open"
);
const closePopUpRegistration = document.getElementById(
  "registration__pop-up_close"
);
const PopUpRegistration = document.getElementById("registration__pop-up");

function openRegistration() {
  PopUpRegistration.classList.add("active");
}

function closeRegistration() {
  PopUpRegistration.classList.remove("active");
}
