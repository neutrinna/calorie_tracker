// const openPopUpNewProduct = document.getElementById("productnotfound__popup-add");
// const closePopUpNotFound = document.getElementById("productnotfound__popup-cancel");
// const closePopUpNewProduct = document.getElementById("newproduct__popup-cancel");
// const popUpNotFound = document.querySelector(".diary__productnotfound__popup");
const popUpAddNewProduct = document.querySelector(".diary__newproduct__popup");
popUpAddNewProduct.style.display = "none";
const commentElem = document.createElement('div');
const loader = document.getElementById('diary-loader');

const productNotFoundPopupExtra = document.querySelector(".diary__productnotfound__popup-extra");
productNotFoundPopupExtra.style.display = "none";
const closePopUpNotFoundExtra = document.getElementById("productnotfound__popup-cancel-extra");


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
                    <div>${fats * grammInput.value / 100}</div>
                    <button class="delete-column"></button>`;
                    const deleteProductButton = document.createElement('button');
                    deleteProductButton.classList.add('delete-column');
                    deleteProductButton.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';

                     // event listener for the delete column button
                    deleteProductButton.addEventListener('click', function() {
                    diaryTableStringDiv.remove();
                    });

                    columnNamesDiv.appendChild(deleteProductButton);
                  
                  
                  searchResultDiv.innerHTML = '';
                  accordeonDivs.appendChild(diaryTableStringDiv);
                  diaryTableStringDiv.appendChild(mealNameDiv);
                  diaryTableStringDiv.appendChild(columnNamesDiv);
                  loader.style.display = 'none';

                   //Александра --- разбивка на классы в зависимости от родителя

                  const deleteProductButton = document.createElement('button');
                  const deleteProductButton2 = document.createElement('button');
                  const deleteProductButton3 = document.createElement('button');
                  const deleteProductButton4 = document.createElement('button');

                   
                  if (columnNamesDiv.closest('.accordeon1')) {
                    columnNamesDiv.innerHTML = `
                      <div class="weightRes">${weightRes}</div>
                      <div class="calRes">${calRes}</div>
                      <div class="carbsRes">${carbsRes}</div>
                      <div class="protRes">${protRes}</div>
                      <div class="fatsRes">${fatsRes}</div>
                      `
                      
                      deleteProductButton.classList.add('delete-column');
                      deleteProductButton.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';
                      mealNameDiv.appendChild(deleteProductButton);
                    }
  
                      else if (columnNamesDiv.closest('.accordeon2')) {
                        columnNamesDiv.innerHTML = `
                      <div class="weightRes2">${weightRes}</div>
                      <div class="calRes2">${calRes}</div>
                      <div class="carbsRes2">${carbsRes}</div>
                      <div class="protRes2">${protRes}</div>
                      <div class="fatsRes2">${fatsRes}</div>
                      `
                      
                    deleteProductButton2.classList.add('delete-column2');
                    deleteProductButton2.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';
                    mealNameDiv.appendChild(deleteProductButton2);
                      }

                      else if (columnNamesDiv.closest('.accordeon3')) {
                        columnNamesDiv.innerHTML = `
                      <div class="weightRes3">${weightRes}</div>
                      <div class="calRes3">${calRes}</div>
                      <div class="carbsRes3">${carbsRes}</div>
                      <div class="protRes3">${protRes}</div>
                      <div class="fatsRes3">${fatsRes}</div>
                      `
                      deleteProductButton3.classList.add('delete-column3');
                    deleteProductButton3.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';
                    mealNameDiv.appendChild(deleteProductButton3);
                      }

                      else {
                        columnNamesDiv.innerHTML = `
                      <div class="weightRes4">${weightRes}</div>
                      <div class="calRes4">${calRes}</div>
                      <div class="carbsRes4">${carbsRes}</div>
                      <div class="protRes4">${protRes}</div>
                      <div class="fatsRes4">${fatsRes}</div>
                      `
                      deleteProductButton4.classList.add('delete-column4');
                    deleteProductButton4.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';
                    mealNameDiv.appendChild(deleteProductButton4);
                      }
                      // --- разбивка на классы в зависимости от родителя



                    var countObj = new Object();
                    var countObj2 = new Object();
                    var countObj3 = new Object();
                    var countObj4 = new Object();


                     // event listener for the delete column button
                    deleteProductButton.addEventListener('click', function() {

                    countObj.weight = `${deleteProductButton.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;

                    countObj.kkal = `${deleteProductButton.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;

                    countObj.carb = `${deleteProductButton.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;

                    countObj.protein = `${deleteProductButton.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;

                    countObj.fat = `${deleteProductButton.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

                    console.log(countObj.weight);
                    console.log(countObj.kkal);

                    diaryTableStringDiv.remove()

                    //вызов вычитания строк после удаления
                      getNumbers ()
                    });

                  // event listener №2 for the delete column button
                    deleteProductButton2.addEventListener ('click', () => {

                      countObj2.weight = `${deleteProductButton2.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;

                      countObj2.kkal = `${deleteProductButton2.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;

                      countObj2.carb = `${deleteProductButton2.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;

                      countObj2.protein = `${deleteProductButton2.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;

                      countObj2.fat = `${deleteProductButton2.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

                      console.log(countObj2.weight);
                      console.log(countObj2.kkal);

                      diaryTableStringDiv.remove()

                    //вызов вычитания строк после удаления
                      getNumbers2 ()
                    })


                    // event listener №3 for the delete column button
                    deleteProductButton3.addEventListener ('click', () => {

                      countObj3.weight = `${deleteProductButton3.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;

                      countObj3.kkal = `${deleteProductButton3.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;

                      countObj3.carb = `${deleteProductButton3.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;

                      countObj3.protein = `${deleteProductButton3.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;

                      countObj3.fat = `${deleteProductButton3.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

                      console.log(countObj3.weight);
                      console.log(countObj3.kkal);

                      diaryTableStringDiv.remove()

                    //вызов вычитания строк после удаления
                      getNumbers3 ()
                    })

                    // event listener №3 for the delete column button
                    deleteProductButton4.addEventListener ('click', () => {

                      countObj4.weight = `${deleteProductButton4.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;

                      countObj4.kkal = `${deleteProductButton4.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;

                      countObj4.carb = `${deleteProductButton4.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;

                      countObj4.protein = `${deleteProductButton4.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;

                      countObj4.fat = `${deleteProductButton4.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

                      console.log(countObj4.weight);
                      console.log(countObj4.kkal);

                      diaryTableStringDiv.remove()

                    //вызов вычитания строк после удаления
                      getNumbers4 ()
                    })
                    
                    
  
                 

  //////    ////      /////string total weight Aleksandra //////////////

                    //////завтрак 
                  const stringWeightBreakfast = document.getElementById('stringWeightBreakfast');
                  const stringKkalBreakfast = document.getElementById('stringKkalBreakfast');
                  const stringCarbBreakfast = document.getElementById('stringCarbBreakfast');
                  const stringProteinBreakfast = document.getElementById('stringProteinBreakfast');
                  const stringFatBreakfast = document.getElementById('stringFatBreakfast');


                    ////обед
                  const stringWeightLunch = document.getElementById('stringWeightLunch');
                  const stringKkalLunch = document.getElementById('stringKkalLunch');
                  const stringCarbLunch = document.getElementById('stringCarbLunch');
                  const stringProteinLunch = document.getElementById('stringProteinLunch');
                  const stringFatLunch = document.getElementById('stringFatLunch');

                  ///ужин
                  const stringWeightDinner= document.getElementById('stringWeightDinner');
                  const stringKkalDinner = document.getElementById('stringKkalDinner');
                  const stringCarbDinner = document.getElementById('stringCarbDinner');
                  const stringProteinDinner = document.getElementById('stringProteinDinner');
                  const stringFatDinner = document.getElementById('stringFatDinner');

                  ///перекус
                  const stringWeightSnack= document.getElementById('stringWeightSnack');
                  const stringKkalSnack = document.getElementById('stringKkalSnack');
                  const stringCarbSnack = document.getElementById('stringCarbSnack');
                  const stringProteinSnack = document.getElementById('stringProteinSnack');
                  const stringFatSnack = document.getElementById('stringFatSnack');



                      ///массивы вес 
                  const weightArray = document.querySelectorAll ('.weightRes')
                  const weightArray2 = document.querySelectorAll ('.weightRes2')
                  const weightArray3 = document.querySelectorAll ('.weightRes3')
                  const weightArray4 = document.querySelectorAll ('.weightRes4')

                     //массивы калории 
                  const kkalArray = document.querySelectorAll ('.calRes');
                  const kkalArray2 = document.querySelectorAll ('.calRes2');
                  const kkalArray3 = document.querySelectorAll ('.calRes3');
                  const kkalArray4 = document.querySelectorAll ('.calRes4');

                     //массивы углеводы
                  const carbsArray = document.querySelectorAll ('.carbsRes');
                  const carbsArray2 = document.querySelectorAll ('.carbsRes2');
                  const carbsArray3 = document.querySelectorAll ('.carbsRes3');
                  const carbsArray4 = document.querySelectorAll ('.carbsRes4');

                    //массивы протеины
                  const protsArray = document.querySelectorAll ('.protRes');
                  const protsArray2 = document.querySelectorAll ('.protRes2');
                  const protsArray3 = document.querySelectorAll ('.protRes3');
                  const protsArray4 = document.querySelectorAll ('.protRes4');

                    //массивы жиры
                  const fatsArray = document.querySelectorAll ('.fatsRes');
                  const fatsArray2 = document.querySelectorAll ('.fatsRes2');
                  const fatsArray3 = document.querySelectorAll ('.fatsRes3');
                  const fatsArray4 = document.querySelectorAll ('.fatsRes4');

                    
                            //вызовы построчного суммирования КБЖУ

                  const countStringWeight = () => {
                      stringWeightBreakfast.innerText = `${countSum (weightArray)}`
                      stringKkalBreakfast.innerText = `${countSum (kkalArray)}`
                      stringCarbBreakfast.innerText = `${countSum (carbsArray)}`
                      stringProteinBreakfast.innerText = `${countSum (protsArray)}`
                      stringFatBreakfast.innerText = `${countSum (fatsArray)}`
                  }

                  const countStringWeight2 = () => {
                    stringWeightLunch.innerText = `${countSum (weightArray2)}`
                    stringKkalLunch.innerText = `${countSum (kkalArray2)}`
                    stringCarbLunch.innerText = `${countSum (carbsArray2)}`
                    stringProteinLunch.innerText = `${countSum (protsArray2)}`
                    stringFatLunch.innerText = `${countSum (fatsArray2)}`
                  }

                  const countStringWeight3 = () => {
                    stringWeightDinner.innerText = `${countSum (weightArray3)}`
                    stringKkalDinner.innerText = `${countSum (kkalArray3)}`
                    stringCarbDinner.innerText = `${countSum (carbsArray3)}`
                    stringProteinDinner.innerText = `${countSum (protsArray3)}`
                    stringFatDinner.innerText = `${countSum (fatsArray3)}`
                  }

                  const countStringWeight4 = () => {
                    stringWeightSnack.innerText = `${countSum (weightArray4)}`
                    stringKkalSnack.innerText = `${countSum (kkalArray4)}`
                    stringCarbSnack.innerText = `${countSum (carbsArray4)}`
                    stringProteinSnack.innerText = `${countSum (protsArray4)}`
                    stringFatSnack.innerText = `${countSum (fatsArray4)}`
                  }

                  // цикл подсчета сложения 
                  function countSum (array, sum) {
                    sum = 0;
                    for (let i = 0 ; i < array.length; i++){
                      sum += Number(array[i].innerHTML);
                    }
                    return sum;
                  }


                    // функции вычитания по каждому столбцу строки
                  function minusSum (a, b) {
                    a -= Number(b);
                    return a;
                  }

                  function minusSum2 (a, b) {
                    a -= Number(b);
                    return a;
                  }

                  function minusSum3 (a, b) {
                    a -= Number(b);
                    return a;
                  }

                  function minusSum4 (a, b) {
                    a -= Number(b);
                    return a;
                  }

                  function minusSum5 (a, b) {
                    a -= Number(b);
                    return a;
                  }


                   // функции вычитания и переноса данных в заголовки

                function getNumbers () {

                    stringWeightBreakfast.innerText = `${minusSum (+stringWeightBreakfast.innerText, countObj.weight)}`
                    stringKkalBreakfast.innerText = `${minusSum2 (+stringKkalBreakfast.innerText, countObj.kkal)}`
                    stringCarbBreakfast.innerText = `${minusSum3 (+stringCarbBreakfast.innerText, countObj.carb)}`
                    stringProteinBreakfast.innerText = `${minusSum4 (+stringProteinBreakfast.innerText, countObj.protein)}`
                    stringFatBreakfast.innerText = `${minusSum5 (+stringFatBreakfast.innerText, countObj.fat)}`
                    
                }

                function getNumbers2 () {

                  stringWeightLunch.innerText = `${minusSum (+stringWeightLunch.innerText, countObj2.weight)}`
                  stringKkalLunch.innerText = `${minusSum2 (+stringKkalLunch.innerText, countObj2.kkal)}`
                  stringCarbLunch.innerText = `${minusSum3 (+stringCarbLunch.innerText, countObj2.carb)}`
                  stringProteinLunch.innerText = `${minusSum4 (+stringProteinLunch.innerText, countObj2.protein)}`
                  stringFatLunch.innerText = `${minusSum5 (+stringFatLunch.innerText, countObj2.fat)}`

                }

                function getNumbers3 () {

                  stringWeightDinner.innerText = `${minusSum (+stringWeightDinner.innerText, countObj3.weight)}`;
                  stringKkalDinner.innerText = `${minusSum2 (+stringKkalDinner.innerText, countObj3.kkal)}`
                  stringCarbDinner.innerText = `${minusSum3 (+stringCarbDinner.innerText, countObj3.carb)}`
                  stringProteinDinner.innerText = `${minusSum4 (+stringProteinDinner.innerText, countObj3.protein)}`
                  stringFatDinner.innerText = `${minusSum5 (+stringFatDinner.innerText, countObj3.fat)}`

                }

                function getNumbers4 () {

                  stringWeightSnack.innerText = `${minusSum (+stringWeightSnack.innerText, countObj4.weight)}`;
                  stringKkalSnack.innerText = `${minusSum2 (+stringKkalSnack.innerText, countObj4.kkal)}`
                  stringCarbSnack.innerText = `${minusSum3 (+stringCarbSnack.innerText, countObj4.carb)}`
                  stringProteinSnack.innerText = `${minusSum4 (+stringProteinSnack.innerText, countObj4.protein)}`
                  stringFatSnack.innerText = `${minusSum5 (+stringFatSnack.innerText, countObj4.fat)}`
                    
                }



                // вызовы функций сложения данных строк
                countStringWeight ()
                countStringWeight2 ()
                countStringWeight3 ()
                countStringWeight4 ()
                

                ////////////       end  Aleksandra        //////////////////



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
              openPopupProductNotFoundExtra();
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

// let mealTypes = {};

// // Save meal types by accordeon id//
// function saveMealTypes() {
//   mealTypes.breakfast = "accordeon-breakfast";
//   mealTypes.lunch = "accordeon-lunch";
//   mealTypes.dinner = "accordeon-dinner";
//   mealTypes.snack = "accordeon-snack";
// }

// function openPopupProductNotFound(message) {
  // popUpNotFound.style.display = "block";
  // saveMealTypes();
// }

function openPopupProductNotFoundExtra(message) {
  productNotFoundPopupExtra.style.display = "block";
}

function closeNotFoundExtra(event) {
  event.preventDefault();
  productNotFoundPopupExtra.style.display = "none";
  input.innerHTML = ""; 
  loader.style.display = 'none'; 
}

closePopUpNotFoundExtra.addEventListener("click", closeNotFoundExtra);

// openPopUpNewProduct.addEventListener("click", openNewProduct);
// closePopUpNotFound.addEventListener("click", closeNotFound);
// closePopUpNewProduct.addEventListener("click", closeNewProduct);


// add new product form //
// const addNewProduct = document.getElementById("newproduct__popup-add");
// addNewProduct.addEventListener("click", function(event) {
//   event.preventDefault();

  
  // const brandPopUp = document.querySelector('input[name="product-brand"]').value;
  // const namePopUp = document.querySelector('input[name="product-name"]').value;
  // const grammPopUp = document.querySelector('input[name="serving-size"]').value;
  // const caloriesPopUp = document.querySelector('input[name="calories"]').value;
  // const fatPopUp = document.querySelector('input[name="fat"]').value;
  // const carbsPopUp = document.querySelector('input[name="carbs"]').value;
  // const proteinPopUp = document.querySelector('input[name="protein"]').value;

  // const mealType = mealTypes[event.target.dataset.mealType];
  // const accordeonDivsPopUp = document.getElementById(mealType);
  
//   let index = 0;
//     const accordeonDivsPopUp = document.querySelector(`.accordeon${index + 1}.accordeon_hidden`);
 
//                   const diaryTableStringDivPopUp = document.createElement('div');
//                   diaryTableStringDivPopUp.classList.add('diary-table-string-1');
//                   const mealNameDivPopUp = document.createElement('div');
//                   mealNameDivPopUp.classList.add('diary-table-string-1__meal-name');
//                   mealNameDivPopUp.innerHTML = `
//                     <div>${brandPopUp}${namePopUp}</div>`;

//                   const columnNamesDivPopUp = document.createElement('div');
//                   columnNamesDivPopUp.classList.add('diary-table-string-1__column-names');
//                   columnNamesDivPopUp.style.display = 'flex';
//                   columnNamesDivPopUp.innerHTML = `
//                     <div>${grammPopUp}</div>
//                     <div>${caloriesPopUp * grammPopUp / 100}</div>
//                     <div>${carbsPopUp * grammPopUp / 100}</div>
//                     <div>${proteinPopUp * grammPopUp / 100}</div>
//                     <div>${fatPopUp * grammPopUp / 100}</div>
//                     <button class="delete-column"></button>`;

//                     const deleteProductButtonPopUp = document.createElement('button');
//                     deleteProductButtonPopUp.classList.add('delete-column');
//                     deleteProductButtonPopUp.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';
                    
//                     // event listener for the delete column button
//                     deleteProductButtonPopUp.addEventListener('click', function() {
//                     diaryTableStringDivPopUp.remove();
//                     });
                    
//                   columnNamesDivPopUp.appendChild(deleteProductButtonPopUp);
                                      
//                   accordeonDivsPopUp.appendChild(diaryTableStringDivPopUp);
//                   diaryTableStringDivPopUp.appendChild(mealNameDivPopUp);
//                   diaryTableStringDivPopUp.appendChild(columnNamesDivPopUp);


                 
//                   popUpAddNewProduct.style.display = "none";
//                   document.querySelector('input[name="product-brand"]').value = "";
//                   document.querySelector('input[name="product-name"]').value= "";
//   document.querySelector('input[name="serving-size"]').value= "";
//   document.querySelector('input[name="calories"]').value= "";
//   document.querySelector('input[name="fat"]').value= "";
//   document.querySelector('input[name="carbs"]').value= "";
//   document.querySelector('input[name="protein"]').value= "";
                 

//                 });

// function openNewProduct(event) {
//   event.preventDefault();
//   popUpNotFound.style.display = "none";
//   popUpAddNewProduct.style.display = "block";
//   loader.style.display = 'none';
  
// }

// function closeNotFound(event) {
//   event.preventDefault();
//   popUpNotFound.style.display = "none";
//   input.innerHTML = ""; 
//   loader.style.display = 'none'; 
// }

// function closeNewProduct(event) {
//   event.preventDefault();
//   popUpAddNewProduct.style.display = "none";
//   loader.style.display = 'none';
// }


//  retrieveTotalValues();

