const openPopUpNewProduct = document.getElementById("productnotfound__popup-add");
const closePopUpNotFound = document.getElementById("productnotfound__popup-cancel");
const popUpNotFound = document.querySelector(".productnotfound__popup");
const popUpAddNewProduct = document.querySelector(".newproduct__popup");
const closePopUpNewProduct = document.getElementById("newproduct__popup-cancel")
popUpAddNewProduct.style.display = "none";
popUpNotFound.style.display = "block";

openPopUpNewProduct.addEventListener("click", openNewProduct);
closePopUpNotFound.addEventListener("click", closeNotFound);
closePopUpNewProduct.addEventListener("click", closeNewProduct);

function openNewProduct(event) {
    event.preventDefault();
    popUpNotFound.style.display = "none";
    popUpAddNewProduct.style.display = "block";
}

function closeNotFound(event) {
    event.preventDefault();
    popUpNotFound.style.display = "none";
    popUpAddNewProduct.style.display = "none";
}

function closeNewProduct(event) {
    event.preventDefault();
    popUpAddNewProduct.style.display = "none";
}

