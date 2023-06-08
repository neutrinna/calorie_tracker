const menuSideBar = document.querySelectorAll(".side-bar__link");
const notification = document.querySelector("#profile-notification");

for (let menuItem of menuSideBar) {
    menuItem.addEventListener("click", () => {
        if (localStorage.getItem('loged') === "true") {
            document.querySelector(".side-bar__link_profile").href = "../index.html";
            document.querySelector(".side-bar__link_diary").href = "./diary.html";
            document.querySelector(".side-bar__link_charts").href = "./charts.html";
            document.querySelector(".side-bar__link_articles").href = "./articles.html";
        }
    })
}
for (let menuItem of menuSideBar) {
    menuItem.addEventListener("click", () => {
        if (localStorage.getItem('loged') === "false") {
            popUpShow()
        }
    })
}


document.querySelector(".profile-notification").addEventListener("click", (e) => {
    if (!e.target.closest('.profile-notification__content')) popUpHide();
})

function popUpShow() {
    notification.style.display = "block";
}

function popUpHide() {
    notification.style.display = "none";
}

document.querySelector(".profile-notification__enter").addEventListener("click", popUpHide)