const openPopUpNewProduct = document.getElementById("productnotfound__popup-add");
const closePopUpNotFound = document.getElementById("productnotfound__popup-cancel");
const closePopUpNewProduct = document.getElementById("newproduct__popup-cancel");
const popUpNotFound = document.querySelector(".diary__productnotfound__popup");
const popUpAddNewProduct = document.querySelector(".diary__newproduct__popup");
popUpAddNewProduct.style.display = "none";
const commentElem = document.createElement('div');
const loader = document.getElementById('diary-loader');

let totalWeight = 0;
let totalCalories = 0;
let totalCarbs = 0;
let totalProteins = 0;
let totalFats = 0;

let mealEaten = {};

function storeMealEaten(meal) {
  const storedMealEatenJSON = localStorage.getItem("mealEaten");
  let storedMealEaten = [];
  if (storedMealEatenJSON) {
    storedMealEaten = JSON.parse(storedMealEatenJSON);
  }
  storedMealEaten.push(meal);

  const updatedMealEatenJSON = JSON.stringify(storedMealEaten);
  localStorage.setItem("mealEaten", updatedMealEatenJSON);
}

function retrieveMealEaten() {
  const storedMealEatenJSON = localStorage.getItem("mealEaten");
  if (storedMealEatenJSON) {
    return JSON.parse(storedMealEatenJSON);
  }
  return [];
}

// local storage total values//
function storeTotalValues() {
  const totalValues = {
    totalWeight: totalWeight,
    totalCalories: totalCalories,
    totalCarbs: totalCarbs,
    totalProteins: totalProteins,
    totalFats: totalFats
  };
  const totalValuesJSON = JSON.stringify(totalValues);
  localStorage.setItem("totalValues", totalValuesJSON);
}

function retrieveTotalValues() {
  const storedTotalValuesJSON = localStorage.getItem("totalValues");
  if (storedTotalValuesJSON) {
    return JSON.parse(storedTotalValuesJSON);
  }
  return null;
}
// total daily nutrition
function updateTotalValues() {
  const totalDiv = document.querySelector('.diary-table-string-2');

  totalDiv.innerHTML = `
    <div class="diary-table-string__column-names diary-table-string__column-names_color_dark-blue">
      <div>${totalWeight.toFixed(0)}</div>
      <div>${totalCalories.toFixed(0)}</div>
      <div>${totalCarbs.toFixed(0)}</div>
      <div>${totalProteins.toFixed(0)}</div>
      <div>${totalFats.toFixed(0)}</div>
    </div>
  `;
}

// on click search result//
document.addEventListener("DOMContentLoaded", function() {
  const forms = document.querySelectorAll(".diary__form__search");

  forms.forEach((form, index) => {
    const input = document.getElementById(`diary-search-${index + 1}`);

    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();

        const searchResultDiv = document.getElementById(`search__show__result-${index + 1}`);
        const searchResult = input.value;
        commentElem.classList.add('elem');
        commentElem.innerHTML = `
          <div class="search-result">${searchResult}</div>`;

        const grammInput = document.createElement('input');
        grammInput.classList.add('inputStyle')
        grammInput.setAttribute('type', 'number');
        grammInput.setAttribute('placeholder', 'грамм');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.style.marginRight = '25%';
        checkbox.style.verticalAlign = 'middle';
        checkbox.style.transform = 'scale(1.5)';

        loader.style.display = 'block';

        // checkbox checked //
        checkbox.addEventListener('change', function() {
          if (checkbox.checked) {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${searchResult}`)
              .then(response => response.json())
              .then(res => {
                console.log(res);
                if (res.status === 1) {
                  const product = res.product;
                  const productName = product.product_name;
                  const calories = product.nutriments['energy-kcal'];
                  const carbs = product.nutriments.carbohydrates;
                  const proteins = product.nutriments.proteins;
                  const fats = product.nutriments.fat;

                  const accordeonDivs = document.querySelector(`.accordeon${index + 1}.accordeon_hidden`);
                  
                  const diaryTableStringDiv = document.createElement('div');
                  diaryTableStringDiv.classList.add('diary-table-string-1');

                  const mealNameDiv = document.createElement('div');
                  mealNameDiv.classList.add('diary-table-string-1__meal-name');
                  mealNameDiv.innerHTML = `
                    <p>${productName}</p>`;

                  const columnNamesDiv = document.createElement('div');
                  columnNamesDiv.classList.add('diary-table-string-1__column-names');
                  columnNamesDiv.style.display = 'flex';
                  columnNamesDiv.innerHTML = `
                    <div>${grammInput.value}</div>
                    <div>${calories * grammInput.value / 100}</div>
                    <div>${carbs * grammInput.value / 100}</div>
                    <div>${proteins * grammInput.value / 100}</div>
                    <div>${fats * grammInput.value / 100}</div>`;

                  searchResultDiv.innerHTML = '';
                  accordeonDivs.appendChild(diaryTableStringDiv);
                  diaryTableStringDiv.appendChild(mealNameDiv);
                  diaryTableStringDiv.appendChild(columnNamesDiv);
                  loader.style.display = 'none';
                 
                  // total weight //
                  totalWeight += Number(grammInput.value);
                  totalCalories += (calories * grammInput.value) / 100;
                  totalCarbs += (carbs * grammInput.value) / 100;
                  totalProteins += (proteins * grammInput.value) / 100;
                  totalFats += (fats * grammInput.value) / 100;

                 
                  updateTotalValues()
                  storeTotalValues();
                  storeMealEaten(mealEaten);
                  retrieveTotalValues();
                }
              })
              .catch(error => {
                console.log('Error:', error);
              });
          }
        });
        // product search by code //
        fetch(`https://world.openfoodfacts.org/api/v0/product/${searchResult}`)
          .then(response => response.json())
          .then(res => {
            console.log(res);
            if (res.status === 1) {
              const product = res.product;
              const productName = product.product_name;
              commentElem.innerHTML = `
                <p>${productName}</p>`;
                loader.style.display = 'none';

              commentElem.appendChild(grammInput);
              commentElem.appendChild(checkbox);
              searchResultDiv.innerHTML = '';
              input.value = '';
              searchResultDiv.appendChild(commentElem);
            } else {
              openPopupProductNotFound();
              searchResultDiv.innerHTML = '';
              input.value = '';
              loader.style.display = 'none';
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
    });
  });
});


function openPopupProductNotFound(message) {
  popUpNotFound.style.display = "block";
}


openPopUpNewProduct.addEventListener("click", openNewProduct);
closePopUpNotFound.addEventListener("click", closeNotFound);
closePopUpNewProduct.addEventListener("click", closeNewProduct);

// add new product form //
const addNewProduct = document.getElementById("newproduct__popup-add");
addNewProduct.addEventListener("click", function(event) {
  event.preventDefault();

  
  const brandPopUp = document.querySelector('input[name="product-brand"]').value;
  const namePopUp = document.querySelector('input[name="product-name"]').value;
  const grammPopUp = document.querySelector('input[name="serving-size"]').value;
  const caloriesPopUp = document.querySelector('input[name="calories"]').value;
  const fatPopUp = document.querySelector('input[name="fat"]').value;
  const carbsPopUp = document.querySelector('input[name="carbs"]').value;
  const proteinPopUp = document.querySelector('input[name="protein"]').value;
  
  
  const accordeonDivsPopUp = document.querySelector(`.accordeon_hidden`);
 
                  const diaryTableStringDivPopUp = document.createElement('div');
                  diaryTableStringDivPopUp.classList.add('diary-table-string-1');
                  const mealNameDivPopUp = document.createElement('div');
                  mealNameDivPopUp.classList.add('diary-table-string-1__meal-name');
                  mealNameDivPopUp.innerHTML = `
                    <div>${brandPopUp}${namePopUp}</div>`;

                  const columnNamesDivPopUp = document.createElement('div');
                  columnNamesDivPopUp.classList.add('diary-table-string-1__column-names');
                  columnNamesDivPopUp.style.display = 'flex';
                  columnNamesDivPopUp.innerHTML = `
                    <div>${grammPopUp}</div>
                    <div>${caloriesPopUp * grammPopUp / 100}</div>
                    <div>${carbsPopUp * grammPopUp / 100}</div>
                    <div>${proteinPopUp * grammPopUp / 100}</div>
                    <div>${fatPopUp * grammPopUp / 100}</div>`;

                
                  accordeonDivsPopUp.appendChild(diaryTableStringDivPopUp);
                  diaryTableStringDivPopUp.appendChild(mealNameDivPopUp);
                  diaryTableStringDivPopUp.appendChild(columnNamesDivPopUp);

                 
                  popUpAddNewProduct.style.display = "none";
                  document.querySelector('input[name="product-brand"]').value = "";
                  document.querySelector('input[name="product-name"]').value= "";
  document.querySelector('input[name="serving-size"]').value= "";
  document.querySelector('input[name="calories"]').value= "";
  document.querySelector('input[name="fat"]').value= "";
  document.querySelector('input[name="carbs"]').value= "";
  document.querySelector('input[name="protein"]').value= "";
                 

                });

function openNewProduct(event) {
  event.preventDefault();
  popUpNotFound.style.display = "none";
  popUpAddNewProduct.style.display = "block";
  loader.style.display = 'none';
  
}

function closeNotFound(event) {
  event.preventDefault();
  popUpNotFound.style.display = "none";
  input.innerHTML = ""; 
  loader.style.display = 'none'; 
}

function closeNewProduct(event) {
  event.preventDefault();
  popUpAddNewProduct.style.display = "none";
  loader.style.display = 'none';
}

 retrieveTotalValues();



