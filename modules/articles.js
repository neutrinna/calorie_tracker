const sectionFood = document.querySelector(".articles-topics-food");
const sectionSport = document.querySelector(".articles-topics-sport");
const sectionPsycho = document.querySelector(".articles-topics-psycho");
const linkFood = document.querySelector(".articles-section__article_food");
const linkSport = document.querySelector(".articles-section__article_sport");
const linkPsycho = document.querySelector(".articles-section__article_psycho");

sectionSport.style.display = "none";
sectionPsycho.style.display = "none";
sectionFood.style.display = "grid";
linkFood.style.backgroundColor = "#ffffff";
linkFood.style.color = "#089BAB";
linkFood.style.fontWeight = "600";

linkFood.addEventListener("click", function (event) {
  event.preventDefault();
  sectionFood.style.display = "grid";
  sectionSport.style.display = "none";
  sectionPsycho.style.display = "none";

  linkFood.style.backgroundColor = "#ffffff";
  linkFood.style.color = "#089BAB";
  linkFood.style.fontWeight = "600";

  linkPsycho.style.backgroundColor = "#089BAB";
  linkPsycho.style.color = "#ffffff";
  linkPsycho.style.fontWeight = "300";

  linkSport.style.backgroundColor = "#089BAB";
  linkSport.style.color = "#ffffff";
  linkSport.style.fontWeight = "300";
});

linkSport.addEventListener("click", function (event) {
  event.preventDefault();
  sectionSport.style.display = "grid";
  sectionFood.style.display = "none";
  sectionPsycho.style.display = "none";

  linkFood.style.backgroundColor = "#089BAB";
  linkFood.style.color = "#ffffff";
  linkFood.style.fontWeight = "300";

  linkSport.style.backgroundColor = "#ffffff";
  linkSport.style.color = "#089BAB";
  linkSport.style.fontWeight = "600";

  linkPsycho.style.backgroundColor = "#089BAB";
  linkPsycho.style.color = "#ffffff";
  linkPsycho.style.fontWeight = "300";
});

linkPsycho.addEventListener("click", function (event) {
  event.preventDefault();
  sectionPsycho.style.display = "grid";
  sectionFood.style.display = "none";
  sectionSport.style.display = "none";

  linkFood.style.backgroundColor = "#089BAB";
  linkFood.style.color = "#ffffff";
  linkFood.style.fontWeight = "300";

  linkSport.style.backgroundColor = "#089BAB";
  linkSport.style.color = "#ffffff";
  linkSport.style.fontWeight = "300";

  linkPsycho.style.backgroundColor = "#ffffff";
  linkPsycho.style.color = "#089BAB";
  linkPsycho.style.fontWeight = "600";
});
