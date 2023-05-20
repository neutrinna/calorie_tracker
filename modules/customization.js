const openPopUpСustomization = document.getElementById(
  "customization__pop-up_open"
);
const closePopUpСustomization = document.getElementById(
  "сustomization__pop-up_close"
);
const PopUpСustomization = document.getElementById("сustomization__pop-up");

function openCustomization() {
  PopUpСustomization.classList.add("active");
}

function closeCustomization() {
  PopUpСustomization.classList.remove("active");
}
