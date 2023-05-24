const form = document.querySelector(".diary__form__search");
const searchResultDiv = document.getElementById("search__show__result");
const popUpNotFound = document.querySelector(".diary__productnotfound__popup");

document.addEventListener("DOMContentLoaded", function() {
  let input = document.getElementById("diary-search");
  input.focus();
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      const searchResult = document.getElementById('diary-search').value;
      const commentElem = document.createElement('div');
      commentElem.classList.add('elem');
      commentElem.innerHTML = `
        <p style="width: 200px">${searchResult}</p>`;

      const grammInput = document.createElement('input');
      grammInput.setAttribute('type', 'number');
      grammInput.setAttribute('placeholder', 'грамм');
      grammInput.style.backgroundColor = 'white';
      grammInput.style.border = '1px solid rgb(10, 155, 171)';
      grammInput.style.height = '40px';
      grammInput.style.borderRadius = '10px';
      grammInput.style.marginLeft = '20%';
      grammInput.style.textAlign = 'center';

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.style.marginRight = '20%';
      checkbox.style.verticalAlign = 'middle';
      checkbox.style.transform = 'scale(1.5)';

     

      fetch(`https://world.openfoodfacts.org/api/v0/product/${searchResult}`)
        .then(response => response.json())
        .then(res => {
          console.log(res);
          if (res.status === 1) {
            const product = res.product;
            const productName = product.product_name;
            commentElem.innerHTML = `
              <p>${productName}</p>`;

            commentElem.appendChild(grammInput);
            commentElem.appendChild(checkbox);
            searchResultDiv.appendChild(commentElem);
            document.getElementById('diary-search').value = '';

          } else {
            openPopupProductNotFound();
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  });
});
function openPopupProductNotFound(message) {
  popUpNotFound.style.display = "block";
}

const openPopUpNewProduct = document.getElementById("productnotfound__popup-add");
const closePopUpNotFound = document.getElementById("productnotfound__popup-cancel");
const popUpAddNewProduct = document.querySelector(".diary__newproduct__popup");
const closePopUpNewProduct = document.getElementById("newproduct__popup-cancel")
popUpAddNewProduct.style.display = "none";
popUpNotFound.style.display = "none";

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


