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

        if (document.querySelector(".profile-user").style.display === "flex") {
            document.querySelector(".side-bar__link_diary").href = "./pages/diary.html";
            document.querySelector(".side-bar__link_charts").href = "./pages/charts.html";
        }
        if (welcomMenu.style.display == "") popUpShow();
    })
}

document.querySelector(".profile-notification__enter").addEventListener("click", popUpHide)

// Инна