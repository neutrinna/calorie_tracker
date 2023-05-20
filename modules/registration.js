const openPopUp = document.getElementById("registration__pop-up_open");
const closePopUp = document.getElementById("registration__pop-up_close");
const PopUp = document.getElementById("registration__pop-up");

openPopUp.addEventListener("click", function (e) {
  e.preventDefault();
  PopUp.classList.add("active");
});

closePopUp.addEventListener("click", () => {
  PopUp.classList.remove("active");
});
