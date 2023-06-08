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


//Объект со всеми итогами
let summaryStrings = new Object;

// постороковые объекты
let countObj = new Object();
let countObj2 = new Object();
let countObj3 = new Object();
let countObj4 = new Object();

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

let weightArray
let weightArray2
let weightArray3
let weightArray4

let kkalArray
let kkalArray2
let kkalArray3
let kkalArray4

let carbsArray
let carbsArray2
let carbsArray3
let carbsArray4

let protsArray
let protsArray2
let protsArray3
let protsArray4

let fatsArray
let fatsArray2
let fatsArray3
let fatsArray4

const forms = document.querySelectorAll(".diary__form__search");

const delete1 = document.querySelectorAll(".delete-column");
const delete2 = document.querySelectorAll(".delete-column2");
const delete3 = document.querySelectorAll(".delete-column3");
const delete4 = document.querySelectorAll(".delete-column4");


// on click search result//

document.addEventListener("DOMContentLoaded", form)
render()

function form() {
  

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
        loader.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`

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
                      deleteProductButton.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки"  onclick="callBtnFunc()">';
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
                    deleteProductButton2.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки" onclick="callBtnFunc2()">';
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
                    deleteProductButton3.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки" onclick="callBtnFunc3()">';
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
                    deleteProductButton4.innerHTML = '<img src=./../assets/images/diary/dairy-delete.png alt="иконка для удаления строки" onclick="callBtnFunc4()">';
                    mealNameDiv.appendChild(deleteProductButton4);
                      }
 
                /////string total weight//////////////

                      ///массивы вес 
                  weightArray = document.querySelectorAll ('.weightRes')
                  weightArray2 = document.querySelectorAll ('.weightRes2')
                  weightArray3 = document.querySelectorAll ('.weightRes3')
                  weightArray4 = document.querySelectorAll ('.weightRes4')

                     //массивы калории 
                  kkalArray = document.querySelectorAll ('.calRes');
                  kkalArray2 = document.querySelectorAll ('.calRes2');
                  kkalArray3 = document.querySelectorAll ('.calRes3');
                  kkalArray4 = document.querySelectorAll ('.calRes4');

                  //массивы углеводы
                  carbsArray = document.querySelectorAll ('.carbsRes');
                  carbsArray2 = document.querySelectorAll ('.carbsRes2');
                  carbsArray3 = document.querySelectorAll ('.carbsRes3');
                  carbsArray4 = document.querySelectorAll ('.carbsRes4');

                    //массивы протеины
                  protsArray = document.querySelectorAll ('.protRes');
                  protsArray2 = document.querySelectorAll ('.protRes2');
                  protsArray3 = document.querySelectorAll ('.protRes3');
                  protsArray4 = document.querySelectorAll ('.protRes4');

                    //массивы жиры
                  fatsArray = document.querySelectorAll ('.fatsRes');
                  fatsArray2 = document.querySelectorAll ('.fatsRes2');
                  fatsArray3 = document.querySelectorAll ('.fatsRes3');
                  fatsArray4 = document.querySelectorAll ('.fatsRes4');
  
                // вызовы функций сложения данных строк
                countStringWeight ()
                countStringWeight2 ()
                countStringWeight3 ()
                countStringWeight4 ()
                ////////////       end  Aleksandra        //////////////////
                recount()
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
            //console.log(res);
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
}

//поп-ап
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

//РАБОТА С ЗАГРУЖЕННЫМИ ИЗ ЛОКАЛКИ СТРОКАМИ

  //вызовы функций по клику на кнопку удаления
function callBtnFunc () {
  countHeightAfterDelete(accordeon)
  getStringDataInObject()
}
function callBtnFunc2 () {
  countHeightAfterDelete(accordeon2)
  getStringDataInObject2()
}
function callBtnFunc3 () {
  countHeightAfterDelete(accordeon3)
  getStringDataInObject3()
}
function callBtnFunc4 () {
  countHeightAfterDelete(accordeon4)
  getStringDataInObject4()
}

function render(){
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  accordeon.innerHTML = currentUser.breakfast.products;
  accordeon2.innerHTML = currentUser.lunch.products;
  accordeon3.innerHTML = currentUser.dinner.products;
  accordeon4.innerHTML = currentUser.snack.products;

  ///массивы вес 
  weightArray = document.querySelectorAll ('.weightRes')
  weightArray2 = document.querySelectorAll ('.weightRes2')
  weightArray3 = document.querySelectorAll ('.weightRes3')
  weightArray4 = document.querySelectorAll ('.weightRes4')

     //массивы калории 
  kkalArray = document.querySelectorAll ('.calRes');
  kkalArray2 = document.querySelectorAll ('.calRes2');
  kkalArray3 = document.querySelectorAll ('.calRes3');
  kkalArray4 = document.querySelectorAll ('.calRes4');

  //массивы углеводы
  carbsArray = document.querySelectorAll ('.carbsRes');
  carbsArray2 = document.querySelectorAll ('.carbsRes2');
  carbsArray3 = document.querySelectorAll ('.carbsRes3');
  carbsArray4 = document.querySelectorAll ('.carbsRes4');

    //массивы протеины
  protsArray = document.querySelectorAll ('.protRes');
  protsArray2 = document.querySelectorAll ('.protRes2');
  protsArray3 = document.querySelectorAll ('.protRes3');
  protsArray4 = document.querySelectorAll ('.protRes4');

    //массивы жиры
  fatsArray = document.querySelectorAll ('.fatsRes');
  fatsArray2 = document.querySelectorAll ('.fatsRes2');
  fatsArray3 = document.querySelectorAll ('.fatsRes3');
  fatsArray4 = document.querySelectorAll ('.fatsRes4');

  recount()
}

 function recount(){
  countStringWeight ()
  countStringWeight2 ()
  countStringWeight3 ()
  countStringWeight4 ()
  countAndSetSummary ()
 }
// document.querySelector("body").addEventListener("onload", render);
// document.addEventListener('DOMContentLoaded', () => render())




//ВЫНОСЫ ФУНКЦИЙ

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

//ПОДСЧЕТ ИТОГОВ

const observedParentsSearch = document.querySelectorAll('.diary-table-string__column-names')

//Эксперименты с наблюдателем
const observerSearch = new MutationObserver(countAndSetSummary)

function countAndSetSummary () { 

   // получение результатов со всех строк
 summaryStrings.Weight = `${+stringWeightBreakfast.innerText + +stringWeightLunch.innerText + +stringWeightDinner.innerText + +stringWeightSnack.innerText}`
 summaryStrings.Kkal = `${+stringKkalBreakfast.innerText + +stringKkalLunch.innerText + +stringKkalDinner.innerText + +stringKkalSnack.innerText}`
 summaryStrings.Carb = `${+stringCarbBreakfast.innerText + +stringCarbLunch.innerText + +stringCarbDinner.innerText + +stringCarbSnack.innerText}`
 summaryStrings.Protein= `${+stringProteinBreakfast.innerText + +stringProteinLunch.innerText + +stringProteinDinner.innerText + +stringProteinSnack.innerText}`
 summaryStrings.Fat= `${+stringFatBreakfast.innerText + +stringFatLunch.innerText + +stringFatDinner.innerText + +stringFatSnack.innerText}`

   // запись итогов в таблицу
 document.querySelector('.diary-macro__weight-amount').innerHTML = `${summaryStrings.Weight}`
 document.querySelector('.diary-macro__kkal-amount').innerHTML = `${summaryStrings.Kkal}`
 document.querySelector('.diary-macro__carbo-amount').innerHTML = `${summaryStrings.Carb}`
 document.querySelector('.diary-macro__protein-amount').innerHTML = `${summaryStrings.Protein}`
 document.querySelector('.diary-macro__fats-amount').innerHTML = `${summaryStrings.Fat}`

     //Инна, это для тебя :) ↓
     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
     currentUser.total = {
       weight: `${summaryStrings.Weight}`,
       kkal: `${summaryStrings.Kkal}`,
       carbs: `${summaryStrings.Carb}`,
       proteins: `${summaryStrings.Protein}`,
       fats: `${summaryStrings.Fat}`,
     };
     localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

observerSearch.observe(observedParentsSearch[0], {
 childList: true, 
 subtree: true,
});

observerSearch.observe(observedParentsSearch[1], {
 childList: true, 
 subtree: true,
});

observerSearch.observe(observedParentsSearch[2], {
 childList: true, 
 subtree: true,
});

observerSearch.observe(observedParentsSearch[3], {
 childList: true, 
 subtree: true,
});

//функции построчного суммирования КБЖУ 

function countStringWeight () {
  stringWeightBreakfast.innerText = `${countSum (weightArray)}`
  stringKkalBreakfast.innerText = `${countSum (kkalArray)}`
  stringCarbBreakfast.innerText = `${countSum (carbsArray)}`
  stringProteinBreakfast.innerText = `${countSum (protsArray)}`
  stringFatBreakfast.innerText = `${countSum (fatsArray)}`

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.breakfast = {
    weight: stringWeightBreakfast.textContent,
    kkal: stringKkalBreakfast.textContent,
    carbs: stringCarbBreakfast.textContent,
    proteins: stringProteinBreakfast.textContent,
    fats: stringFatBreakfast.textContent,
  };
  currentUser.breakfast.products = accordeon.innerHTML;
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

function countStringWeight2 () {
stringWeightLunch.innerText = `${countSum (weightArray2)}`
stringKkalLunch.innerText = `${countSum (kkalArray2)}`
stringCarbLunch.innerText = `${countSum (carbsArray2)}`
stringProteinLunch.innerText = `${countSum (protsArray2)}`
stringFatLunch.innerText = `${countSum (fatsArray2)}`

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
currentUser.lunch = {
  weight: stringWeightLunch.textContent,
  kkal: stringKkalLunch.textContent,
  carbs: stringCarbLunch.textContent,
  proteins: stringProteinLunch.textContent,
  fats: stringFatLunch.textContent,
  products: accordeon2.innerHTML,
};
localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

function countStringWeight3 () {
stringWeightDinner.innerText = `${countSum (weightArray3)}`
stringKkalDinner.innerText = `${countSum (kkalArray3)}`
stringCarbDinner.innerText = `${countSum (carbsArray3)}`
stringProteinDinner.innerText = `${countSum (protsArray3)}`
stringFatDinner.innerText = `${countSum (fatsArray3)}`

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
currentUser.dinner = {
  weight: stringWeightDinner.textContent,
  kkal: stringKkalDinner.textContent,
  carbs: stringCarbDinner.textContent,
  proteins: stringProteinDinner.textContent,
  fats: stringFatDinner.textContent,
  products: accordeon3.innerHTML,
};
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

function countStringWeight4 () {
stringWeightSnack.innerText = `${countSum (weightArray4)}`
stringKkalSnack.innerText = `${countSum (kkalArray4)}`
stringCarbSnack.innerText = `${countSum (carbsArray4)}`
stringProteinSnack.innerText = `${countSum (protsArray4)}`
stringFatSnack.innerText = `${countSum (fatsArray4)}`

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
currentUser.snack = {
  weight: stringWeightSnack.textContent,
  kkal: stringKkalSnack.textContent,
  carbs: stringCarbSnack.textContent,
  proteins: stringProteinSnack.textContent,
  fats: stringFatSnack.textContent,
  products: accordeon4.innerHTML,
};
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

// функции вычитания и переноса данных в заголовки

function getNumbers () {

  stringWeightBreakfast.innerText = `${minusSum (+stringWeightBreakfast.innerText, countObj.weight)}`
  stringKkalBreakfast.innerText = `${minusSum2 (+stringKkalBreakfast.innerText, countObj.kkal)}`
  stringCarbBreakfast.innerText = `${minusSum3 (+stringCarbBreakfast.innerText, countObj.carb)}`
  stringProteinBreakfast.innerText = `${minusSum4 (+stringProteinBreakfast.innerText, countObj.protein)}`
  stringFatBreakfast.innerText = `${minusSum5 (+stringFatBreakfast.innerText, countObj.fat)}`

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.breakfast = {
    weight: stringWeightBreakfast.textContent,
    kkal: stringKkalBreakfast.textContent,
    carbs: stringCarbBreakfast.textContent,
    proteins: stringProteinBreakfast.textContent,
    fats: stringFatBreakfast.textContent,
    products: accordeon.innerHTML,
  };
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  
}

function getNumbers2 () {

stringWeightLunch.innerText = `${minusSum (+stringWeightLunch.innerText, countObj2.weight)}`
stringKkalLunch.innerText = `${minusSum2 (+stringKkalLunch.innerText, countObj2.kkal)}`
stringCarbLunch.innerText = `${minusSum3 (+stringCarbLunch.innerText, countObj2.carb)}`
stringProteinLunch.innerText = `${minusSum4 (+stringProteinLunch.innerText, countObj2.protein)}`
stringFatLunch.innerText = `${minusSum5 (+stringFatLunch.innerText, countObj2.fat)}`

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.lunch = {
      weight: stringWeightLunch.textContent,
      kkal: stringKkalLunch.textContent,
      carbs: stringCarbLunch.textContent,
      proteins: stringProteinLunch.textContent,
      fats: stringFatLunch.textContent,
      products: accordeon2.innerHTML,
    };
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));

}

function getNumbers3 () {

stringWeightDinner.innerText = `${minusSum (+stringWeightDinner.innerText, countObj3.weight)}`;
stringKkalDinner.innerText = `${minusSum2 (+stringKkalDinner.innerText, countObj3.kkal)}`
stringCarbDinner.innerText = `${minusSum3 (+stringCarbDinner.innerText, countObj3.carb)}`
stringProteinDinner.innerText = `${minusSum4 (+stringProteinDinner.innerText, countObj3.protein)}`
stringFatDinner.innerText = `${minusSum5 (+stringFatDinner.innerText, countObj3.fat)}`

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.dinner = {
    weight: stringWeightDinner.textContent,
    kkal: stringKkalDinner.textContent,
    carbs: stringCarbDinner.textContent,
    proteins: stringProteinDinner.textContent,
    fats: stringFatDinner.textContent,
    products: accordeon3.innerHTML,
  };
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));

}


function getNumbers4 () {

  stringWeightSnack.innerText = `${minusSum (+stringWeightSnack.innerText, countObj4.weight)}`;
  stringKkalSnack.innerText = `${minusSum2 (+stringKkalSnack.innerText, countObj4.kkal)}`
  stringCarbSnack.innerText = `${minusSum3 (+stringCarbSnack.innerText, countObj4.carb)}`
  stringProteinSnack.innerText = `${minusSum4 (+stringProteinSnack.innerText, countObj4.protein)}`
  stringFatSnack.innerText = `${minusSum5 (+stringFatSnack.innerText, countObj4.fat)}`

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.snack = {
    weight: stringWeightSnack.textContent,
    kkal: stringKkalSnack.textContent,
    carbs: stringCarbSnack.textContent,
    proteins: stringProteinSnack.textContent,
    fats: stringFatSnack.textContent,
    products: accordeon4.innerHTML,
  };
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  
}



function getStringDataInObject() {
  const btn = document.querySelector('.delete-column')
  countObj.weight = `${btn.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;
  countObj.kkal = `${btn.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;
  countObj.carb = `${btn.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;
  countObj.protein = `${btn.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;
  countObj.fat = `${btn.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

  btn.closest('.diary-table-string-1').remove()

  //вызов вычитания строк после удаления
    getNumbers ()
  }

function getStringDataInObject2() {
  const btn2 = document.querySelector('.delete-column2')
  countObj2.weight = `${btn2.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;
  countObj2.kkal = `${btn2.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;
  countObj2.carb = `${btn2.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;
  countObj2.protein = `${btn2.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;
  countObj2.fat = `${btn2.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

  btn2.closest('.diary-table-string-1').remove()

//вызов вычитания строк после удаления
  getNumbers2 ()
}

function getStringDataInObject3() {
  const btn3 = document.querySelector('.delete-column3')
  countObj3.weight = `${btn3.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;
  countObj3.kkal = `${btn3.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;
  countObj3.carb = `${btn3.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;
  countObj3.protein = `${btn3.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;
  countObj3.fat = `${btn3.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

  btn3.closest('.diary-table-string-1').remove()

//вызов вычитания строк после удаления
  getNumbers3 ()
}

function getStringDataInObject4() {
  const btn4 = document.querySelector('.delete-column4')
  countObj4.weight = `${btn4.closest('.diary-table-string-1').getElementsByTagName('div')[2].innerText}`;
  countObj4.kkal = `${btn4.closest('.diary-table-string-1').getElementsByTagName('div')[3].innerText}`;
  countObj4.carb = `${btn4.closest('.diary-table-string-1').getElementsByTagName('div')[4].innerText}`;
  countObj4.protein = `${btn4.closest('.diary-table-string-1').getElementsByTagName('div')[5].innerText}`;
  countObj4.fat = `${btn4.closest('.diary-table-string-1').getElementsByTagName('div')[6].innerText}`;

  btn4.closest('.diary-table-string-1').remove()

//вызов вычитания строк после удаления
  getNumbers4 ()
}

//посчитать высоту после поиска элемента
const search1 = document.getElementById(`diary-search-1`);
search1.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeight (accordeon);}
  })

const search2 = document.getElementById(`diary-search-2`);
search2.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeight (accordeon2);}
  })

const search3 = document.getElementById(`diary-search-3`);
search3.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeight (accordeon3);}
  })

const search4 = document.getElementById(`diary-search-4`);
search4.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeight (accordeon4);}
  })

function countAccordeonHeight (a) {
    a.style.height = `${a.children.length*64+64}px`;
}

for (let deleteBtn of delete1) {
  deleteBtn.addEventListener(`click`, callBtnFunc);
}

for (let deleteBtn of delete2) {
  deleteBtn.addEventListener(`click`, callBtnFunc2);
}

for (let deleteBtn of delete3) {
  deleteBtn.addEventListener(`click`, callBtnFunc3);
}

for (let deleteBtn of delete4) {
  deleteBtn.addEventListener(`click`, callBtnFunc4);
}