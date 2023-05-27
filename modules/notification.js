// Инна
const menu = document.querySelectorAll(".side-bar__menu");
const welcomMenu = document.querySelector(".profile-welcome__wripper");

$(document).ready(function () {
    popUpHide();
});

document.querySelector(".profile-notification").addEventListener("click", (e) => {
    if (!e.target.closest('.profile-notification__content')) popUpHide();
})

function popUpShow() {
    $("#profile-notification").show();
}

function popUpHide() {
    $("#profile-notification").hide();
}

for (let menuItem of menu) {
    menuItem.addEventListener("click", () => {
        if (localStorage.getItem('loged') === "false") popUpShow();
    })
}

document.querySelector(".profile-notification__enter").addEventListener("click", popUpHide)
// Инна