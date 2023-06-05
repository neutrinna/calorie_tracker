
// трекер воды
const glassCountForm = document.querySelector(".diary-water-tracker__form");
const trackerInput = document.querySelector(".diary-water-tracker__form");
const glassCountRes = document.querySelector(".diary-water-tracker__crrnt-res");
const neededWaterAmount = document.querySelector(".diary-water-tracker__top-res");

// сохранение данных трекера после выхода
document.addEventListener('DOMContentLoaded', () => writeWaterData())
document.addEventListener('DOMContentLoaded', () => setGlassValueOnLoad())


function writeWaterData () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(typeof currentUser.water === "undefined"){
        glassCountRes.textContent = "0 мл"
    } else {
        glassCountRes.textContent = `${currentUser.water}`
    }
}

function setGlassValueOnLoad () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let Radio = currentUser.waterGlassAmount;

    if (Radio) {
    let inp = document.querySelector('input[name="glass"][value="' + Radio + '"]');
    if (inp) {
    inp.checked = true; 
    }}
}

///

const handleFormChange = (e) => {
    const glassCount = e.target.value;
    console.log(glassCount)
    let waterTrackerResult = `${glassCount*200}`; // РЕЗУЛЬТАТ ТРЕКЕРА ВОДЫ
    glassCountRes.textContent = waterTrackerResult; 
    
    const currentUser = JSON.parse(localStorage.getItem(`currentUser`)); 
    currentUser.water = waterTrackerResult;
    currentUser.waterGlassAmount = glassCount;
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



document.addEventListener('DOMContentLoaded', () => showAndHideDiv (accordeon, buttonBreakfast));
document.addEventListener('DOMContentLoaded', () => showAndHideDiv (accordeon2, buttonLunch));
document.addEventListener('DOMContentLoaded', () => showAndHideDiv (accordeon3, buttonDinner));
document.addEventListener('DOMContentLoaded', () => showAndHideDiv (accordeon4, buttonSnack));


buttonBreakfast.addEventListener('click', () => showAndHideDiv (accordeon, buttonBreakfast));

buttonLunch.addEventListener('click', () => showAndHideDiv (accordeon2, buttonLunch));

buttonDinner.addEventListener('click', () => showAndHideDiv (accordeon3, buttonDinner));

buttonSnack.addEventListener('click', () => showAndHideDiv (accordeon4, buttonSnack));


function showAndHideDiv (a, b) {

    if (a.style.visibility !== 'hidden') {

        a.style.visibility="hidden";
        a.style.height = "0px"
        a.style.opacity = "0";
        a.style.transition = "0.7s";

        b.classList.remove('diary-table-string__add-btn_focus');

    } else {
        a.style.visibility="visible";
        a.style.height = `${a.children.length*64}px`;
        a.style.transition = "0.7s";
        a.style.opacity = "1";
        b.classList.add('diary-table-string__add-btn_focus'); 
    }
  
};
    //посчитать высоту после удаления строки
function countHeightAfterDelete (a) {
    a.style.height = `${a.children.length*64-64}px`;
}


//посчитать высоту после поиска элемента
const search1Diary = document.getElementById(`diary-search-1`);
search1Diary.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeightDiary (accordeon);}
  })

const search2Diary = document.getElementById(`diary-search-2`);
search2Diary.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeightDiary (accordeon2);}
  })

const search3Diary = document.getElementById(`diary-search-3`);
search3Diary.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeightDiary (accordeon3);}
  })

const search4Diary = document.getElementById(`diary-search-4`);
search4Diary.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {countAccordeonHeightDiary (accordeon4);}
  })

function countAccordeonHeightDiary (a) {
    a.style.height = `${a.children.length*64+64}px`;
}