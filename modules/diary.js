// трекер воды

const glassCountForm = document.querySelector(".diary-water-tracker__form");
const trackerInput = document.querySelector(".diary-water-tracker__form");
const glassCountRes = document.querySelector(".diary-water-tracker__crrnt-res");


const handleFormChange = (e) => {
    const glassCount = e.target.value;
    console.log(glassCount)
    glassCountRes.textContent = `${glassCount*200}`;
    return e.target.value
}

glassCountForm.addEventListener("change", handleFormChange)


/// плавно скрыть-показать див

const buttonBreakfast = document.getElementById("button-breakfast");
const test = document.querySelector(".d-test"); 

const buttonLunch = document.getElementById("button-lunch")
const test2 = document.querySelector(".d-test2");



buttonBreakfast.addEventListener('click', () => showAndHideDiv (test, buttonBreakfast));

buttonLunch.addEventListener('click', () => showAndHideDiv (test2, buttonLunch));


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


// .o2t-element--hidden {
//     opacity: 0;
//     visibility: hidden;
//   height: 0px;
//     transition: 0.55s opacity, 0.55s visibility;
// }

// .o2t-element:hover~.o2t-element--hidden {
//     opacity: 1;
//     visibility: visible;
//     height: 45px;
// /*     height: auto; */
// /*   transition: 0.55s opacity, 0.55s  */
//   transition: 0.5s
// }


// function showAndHideDiv (a, b) {

//     if (a.style.display !== 'none') {

//         a.style.display="none";
//         b.classList.remove('diary-table-string__add-btn_focus');

//     } else {
//         a.style.display="block";
//         b.classList.add('diary-table-string__add-btn_focus');
//         //a.style.height = `${a.children.length*64}px`;
//     }
  
// };
