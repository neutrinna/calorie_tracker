// трекер воды
const glassCountForm = document.querySelector(".diary-water-tracker__form");
const trackerInput = document.querySelector(".diary-water-tracker__form");
const glassCountRes = document.querySelector(".diary-water-tracker__crrnt-res");
const neededWaterAmount = document.querySelector(".diary-water-tracker__top-res");


const handleFormChange = (e) => {
    const glassCount = e.target.value;
    console.log(glassCount)
    let waterTrackerResult = `${glassCount*200}`; // РЕЗУЛЬТАТ ТРЕКЕРА ВОДЫ
    glassCountRes.textContent = waterTrackerResult; 
    
    const currentUser = JSON.parse(localStorage.getItem(`currentUser`)); 
    currentUser.water = waterTrackerResult;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser)); // ЗАПИСЬ РЕЗУЛЬТАТА В localStorage
}


glassCountForm.addEventListener("change", handleFormChange)


/// плавно скрыть-показать див

const buttonBreakfast = document.getElementById("button-breakfast");
const accordeon = document.querySelector(".accordeon1"); 

const buttonLunch = document.getElementById("button-lunch")
const accordeon2 = document.querySelector(".accordeon2");

const buttonDinner = document.getElementById("button-dinner")
const accordeon3 = document.querySelector(".accordeon3");

const buttonSnack = document.getElementById("button-snack")
const accordeon4 = document.querySelector(".accordeon4");


buttonBreakfast.addEventListener('click', () => showAndHideDiv (accordeon, buttonBreakfast));

buttonLunch.addEventListener('click', () => showAndHideDiv (accordeon2, buttonLunch));

buttonDinner.addEventListener('click', () => showAndHideDiv (accordeon3, buttonDinner));

buttonSnack.addEventListener('click', () => showAndHideDiv (accordeon4, buttonSnack));



function showAndHideDiv (a, b) {

    if (a.style.visibility !== 'hidden') {

        a.style.visibility="hidden";
        a.style.height = "0px"
        a.style.opacity = "0";
        a.style.transition = "0.5s";

        b.classList.remove('diary-table-string__add-btn_focus');

    } else {
        a.style.visibility="visible";
        a.style.height = `${a.children.length*64}px`;
        a.style.transition = "0.5s";
        a.style.opacity = "1";
        b.classList.add('diary-table-string__add-btn_focus');
        
    }
  
};



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