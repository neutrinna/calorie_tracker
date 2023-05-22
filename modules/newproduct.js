const addPopUpNewProduct = document.getElementById("productnotfound__popup-submit");
const closePopUpNewProduct = document.getElementById("productnotfound__popup-cancel");
const popUpNotFound = document.getElementById("productnotfound__popup");
const popUpAddNewProduct = document.getElementById("newproduct__popup");
popUpAddNewProduct.style.display = "none";
popUpNotFound.style.display = "block";

addPopUpNewProduct.addEventListener("click", addNewProduct);
closePopUpNewProduct.addEventListener("click", cancelNewProduct);

function addNewProduct(event) {
    event.preventDefault();
    popUpNotFound.style.display = "none";
    popUpAddNewProduct.style.display = "block";
}

function cancelNewProduct(event) {
    event.preventDefault();
    popUpNotFound.style.display = "none";
}
