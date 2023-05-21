// Инна
const menu = document.querySelectorAll(".side-bar__menu");
const welcomMenu = document.querySelector(".profile-welcome__wripper");

$(document).ready(function () {
    //Скрыть PopUp при загрузке страницы    
    popUpHide();
});
//Функция отображения PopUp
function popUpShow() {
    $("#profile-notification").show();
}
//Функция скрытия PopUp
function popUpHide() {
    $("#profile-notification").hide();
}


for(menuItem of menu) {
    menuItem.addEventListener("click", () => {
        if(welcomMenu.style.display == "") popUpShow()
    })
}

// Инна