const menuSideBar = document.querySelectorAll(".side-bar__menu");

for (let menuItem of menuSideBar) {
    menuItem.addEventListener("click", () => {
        if (localStorage.getItem('loged') === "true") {
            document.querySelector(".side-bar__link_diary").href = "./pages/diary.html";
            document.querySelector(".side-bar__link_charts").href = "./pages/charts.html";
            document.querySelector(".side-bar__link_articles").href = "./pages/articles.html";
        }
    })
}

