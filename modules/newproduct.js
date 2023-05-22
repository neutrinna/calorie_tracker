document.addEventListener("DOMContentLoaded", function() {
    const addPopUpNewProduct = document.getElementById("productnotfound__popup-submit");
    const closePopUpNewProduct = document.getElementById("productnotfound__popup-cancel");
    const popUpNewProduct = document.getElementById("productnotfound__popup");
    const popUpAddNewProduct = document.getElementById("newproduct__popup");
  
    function addNewProduct() {
      event.preventDefault();
      popUpNewProduct.style.display = "none";
      popUpAddNewProduct.style.display = "block";
    }
  
    function cancelNewProduct() {
      event.preventDefault();
      popUpNewProduct.style.display = "none";
    }
  
    addPopUpNewProduct.addEventListener("click", addNewProduct);
    closePopUpNewProduct.addEventListener("click", cancelNewProduct);
  });