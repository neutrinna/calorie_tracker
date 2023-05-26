// трекер воды

const glassCountForm = document.querySelector(".diary-water-tracker__form");
const trackerInput = document.querySelector(".diary-water-tracker__form");
const glassCountRes = document.querySelector(".diary-water-tracker__crrnt-res");



const handleFormChange = (e) => {
    const glassCount = e.target.value;
    console.log(glassCount)
    let waterTrackerResult = `${glassCount*200}`; // РЕЗУЛЬТАТ ТРЕКЕРА ВОДЫ
    glassCountRes.textContent = waterTrackerResult; 
    localStorage.setItem('WaterTracker', `${waterTrackerResult}`); // ЗАПИСЬ РЕЗУЛЬТАТА В localStorage
}

glassCountForm.addEventListener("change", handleFormChange)


/// плавно скрыть-показать див

const buttonBreakfast = document.getElementById("button-breakfast");
const accordeon = document.querySelector(".accordeon"); 

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

//трекер воды

