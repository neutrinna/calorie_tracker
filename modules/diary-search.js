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
    
      <div>${totalWeight.toFixed(0)} г</div>
      <div>${totalCalories.toFixed(0)} Ккал</div>
      <div>${totalCarbs.toFixed(0)} У</div>
      <div>${totalProteins.toFixed(0)} Б</div>
      <div>${totalFats.toFixed(0)} Ж</div>
    
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
                  //columnNamesDiv.style.display = 'flex';

                  const weightRes = grammInput.value;
                  const calRes = Math.round(calories * grammInput.value / 100);
                  const carbsRes = Math.round(carbs * grammInput.value / 100);
                  const protRes = Math.round(proteins * grammInput.value / 100);
                  const fatsRes = Math.round(fats * grammInput.value / 100);


                  searchResultDiv.innerHTML = '';
                  accordeonDivs.appendChild(diaryTableStringDiv);
                  diaryTableStringDiv.appendChild(mealNameDiv);
                  diaryTableStringDiv.appendChild(columnNamesDiv);
                  loader.style.display = 'none';


                    //Александра --- разбивка на классы в зависимости от родителя
                  if (columnNamesDiv.closest('.accordeon1')) {
                    columnNamesDiv.innerHTML = `
                      <div class="weightRes">${weightRes}</div>
                      <div class="calRes">${calRes}</div>
                      <div class="carbsRes">${carbsRes}</div>
                      <div class="protRes">${protRes}</div>
                      <div class="fatsRes">${fatsRes}</div>
                      `}
  
                      else if (columnNamesDiv.closest('.accordeon2')) {
                        columnNamesDiv.innerHTML = `
                      <div class="weightRes2">${weightRes}</div>
                      <div class="calRes2">${calRes}</div>
                      <div class="carbsRes2">${carbsRes}</div>
                      <div class="protRes2">${protRes}</div>
                      <div class="fatsRes2">${fatsRes}</div>
                      `
                      }

                      else if (columnNamesDiv.closest('.accordeon3')) {
                        columnNamesDiv.innerHTML = `
                      <div class="weightRes3">${weightRes}</div>
                      <div class="calRes3">${calRes}</div>
                      <div class="carbsRes3">${carbsRes}</div>
                      <div class="protRes3">${protRes}</div>
                      <div class="fatsRes3">${fatsRes}</div>
                      `
                      }

                      else {
                        columnNamesDiv.innerHTML = `
                      <div class="weightRes4">${weightRes}</div>
                      <div class="calRes4">${calRes}</div>
                      <div class="carbsRes4">${carbsRes}</div>
                      <div class="protRes4">${protRes}</div>
                      <div class="fatsRes4">${fatsRes}</div>
                      `
                      }// --- разбивка на классы в зависимости от родителя


                      const deleteProductButton = document.createElement('button');
                    deleteProductButton.classList.add('delete-column');
                    deleteProductButton.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';

                     // event listener for the delete column button
                    deleteProductButton.addEventListener('click', function() {
                    diaryTableStringDiv.remove()

                    //ВЫЗОВ ПОДСЧЕТА СТРОК ПОСЛЕ УДАЛЕНИЯ
                    countStringWeight ()
                    countStringWeight2 ()
                    countStringWeight3 ()
                    countStringWeight4 ()
                    });
                    
                    //columnNamesDiv.appendChild(deleteProductButton);
                    mealNameDiv.appendChild(deleteProductButton);
                    
  
                 

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

                    
                      //построчный подсчет КБЖУ

                  const countStringWeight = () => {
                      stringWeightBreakfast.innerText = `Вес, ${countSum (weightArray)} г`;
                      stringKkalBreakfast.innerText = `${countSum (kkalArray)} Ккал`
                      stringCarbBreakfast.innerText = `${countSum (carbsArray)} У`
                      stringProteinBreakfast.innerText = `${countSum (protsArray)} Б`
                      stringFatBreakfast.innerText = `${countSum (fatsArray)} Ж`
                  }

                  const countStringWeight2 = () => {
                    stringWeightLunch.innerText = `Вес, ${countSum (weightArray2)} г`;
                    stringKkalLunch.innerText = `${countSum (kkalArray2)} Ккал`
                    stringCarbLunch.innerText = `${countSum (carbsArray2)} У`
                    stringProteinLunch.innerText = `${countSum (protsArray2)} Б`
                    stringFatLunch.innerText = `${countSum (fatsArray2)} Ж`
                  }

                  const countStringWeight3 = () => {
                    stringWeightDinner.innerText = `Вес, ${countSum (weightArray3)} г`;
                    stringKkalDinner.innerText = `${countSum (kkalArray3)} Ккал`
                    stringCarbDinner.innerText = `${countSum (carbsArray3)} У`
                    stringProteinDinner.innerText = `${countSum (protsArray3)} Б`
                    stringFatDinner.innerText = `${countSum (fatsArray3)} Ж`
                  }

                  const countStringWeight4 = () => {
                    stringWeightSnack.innerText = `Вес, ${countSum (weightArray4)} г`;
                    stringKkalSnack.innerText = `${countSum (kkalArray4)} Ккал`
                    stringCarbSnack.innerText = `${countSum (carbsArray4)} У`
                    stringProteinSnack.innerText = `${countSum (protsArray4)} Б`
                    stringFatSnack.innerText = `${countSum (fatsArray4)} Ж`
                  }

                  // цикл подсчета
                  function countSum (array, sum) {
                    sum = 0;
                    for (let i = 0 ; i < array.length; i++){
                      console.log(array.length);
                      sum += Number(array[i].innerHTML);
                    }
                    return sum;
                  }

                      //Эксперименты с наблюдателем
                // let observer = new MutationObserver(mutationRecords => {
                //   console.log(mutationRecords); // console.log(изменения)
                //   countStringWeight ()
                //   // countStringWeight2 ()
                //   // countStringWeight3 ()
                //   // countStringWeight4 ()
                // });
                
                // // наблюдать за всем, кроме атрибутов
                // observer.observe(accordeonDivs, {
                //   childList: true, // наблюдать за непосредственными детьми
                //   subtree: true, // и более глубокими потомками
                //   //characterDataOldValue: true // передавать старое значение в колбэк
                // });


                // вызовы функций подсчета данных строк
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


                  // columnNamesDivPopUp.innerHTML = `
                  //   <div>${grammPopUp}</div>
                  //   <div>${caloriesPopUp * grammPopUp / 100}</div>
                  //   <div>${carbsPopUp * grammPopUp / 100}</div>
                  //   <div>${proteinPopUp * grammPopUp / 100}</div>
                  //   <div>${fatPopUp * grammPopUp / 100}</div>
                  //   <button class="delete-column"></button>`;


                  accordeonDivsPopUp.appendChild(diaryTableStringDivPopUp);
                  diaryTableStringDivPopUp.appendChild(mealNameDivPopUp);
                  diaryTableStringDivPopUp.appendChild(columnNamesDivPopUp);

                    //Александра --- классы в зависимости от родителя

                    if (columnNamesDivPopUp.closest('.accordeon1')) {
                      
                      columnNamesDivPopUp.innerHTML = `
                        <div class="weightRes">${grammPopUp}</div>
                        <div class="calRes">${Math.round(caloriesPopUp * grammPopUp / 100)}</div>
                        <div class="carbsRes">${Math.round(carbsPopUp * grammPopUp / 100)}</div>
                        <div class="protRes">${Math.round(proteinPopUp * grammPopUp / 100)}</div>
                        <div class="fatsRes">${Math.round(fatPopUp * grammPopUp / 100)}</div>
                        `
                      }
                         else if (columnNamesDivPopUp.closest('.accordeon2')) {

                          columnNamesDivPopUp.innerHTML = `
                        <div class="weightRes2">${grammPopUp}</div>
                        <div class="calRes2">${Math.round(caloriesPopUp * grammPopUp / 100)}</div>
                        <div class="carbsRes2">${Math.round(carbsPopUp * grammPopUp / 100)}</div>
                        <div class="protRes2">${Math.round(proteinPopUp * grammPopUp / 100)}</div>
                        <div class="fatsRes2">${Math.round(fatPopUp * grammPopUp / 100)}</div>
                        <button class="delete-column"></button>`
                        }
  
                        else if (columnNamesDivPopUp.closest('.accordeon3')) {
        //                   columnNamesDivPopUp.innerHTML = `
//                         <div class="weightRes3">${weightRes}</div>
                        <div class="calRes3">${calRes}</div>
                        <div class="carbsRes3">${carbsRes}</div>
                        <div class="protRes3">${protRes}</div>
                        <div class="fatsRes3">${fatsRes}</div>
                        <button class="delete-column"></button>`
                        }
  
                        else {

                          columnNamesDivPopUp.innerHTML = `
                          <div class="weightRes4">${grammPopUp}</div>
//                           <div class="calRes4">${Math.round(caloriesPopUp * grammPopUp / 100)}</div>
//                           <div class="carbsRes4">${Math.round(carbsPopUp * grammPopUp / 100)}</div>
//                           <div class="protRes4">${Math.round(proteinPopUp * grammPopUp / 100)}</div>
//                           <div class="fatsRes4">${Math.round(fatPopUp * grammPopUp / 100)}</div>
//                           <button class="delete-column"></button>`
                        }


                        //--- классы в зависимости от родителя

//                     const deleteProductButtonPopUp = document.createElement('button');
//                     deleteProductButtonPopUp.classList.add('delete-column');
//                     deleteProductButtonPopUp.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки">';
                    
//                     // event listener for the delete column button
//                     deleteProductButtonPopUp.addEventListener('click', function() {
//                     diaryTableStringDivPopUp.remove();
//                     });
                    
                    mealNameDivPopUp.appendChild(deleteProductButtonPopUp);
                                    

                 
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

