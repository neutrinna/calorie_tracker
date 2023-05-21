const form = document.getElementById("form-rsk");
const button = document.querySelector(".calculate-rsk");

const goal = document.getElementById("goal");
const age = document.querySelector(".input-age");
const gender = document.getElementById("gender");
const activity = document.getElementById("activity");
const weight = document.querySelector(".input-weight");
const growth = document.querySelector(".input-growth");

let resultRSK = document.querySelector(".result-rsk");
const protein = document.querySelector(".proteins");
const fat = document.querySelector(".fats");
const carbohydrate = document.querySelector(".carbohydrates");

const rateGole = 0.2;

const getNormRSK = function () {
  if (gender.value == "male") {
    resultRSK.innerHTML = Math.round(
      `${
        (9.99 * +weight.value + 6.25 * +growth.value - 4.92 * +age.value + 5) *
        +activity.value
      }`
    );
  } else if (gender.value == "female") {
    resultRSK.innerHTML = Math.round(
      `${
        (9.99 * +weight.value +
          6.25 * +growth.value -
          4.92 * +age.value -
          161) *
        +activity.value
      }`
    );
  }
  return resultRSK.innerHTML;
};

function resultGoal() {
  if (goal.value == "lose-weight") {
    resultRSK.innerHTML = +getNormRSK() - +getNormRSK() * rateGole;
  } else if (goal.value == "maintenance") {
    resultRSK.innerHTML = getNormRSK();
  } else if (goal.value == "gain") {
    resultRSK.innerHTML = +getNormRSK() + +getNormRSK() * rateGole;
  }
  return resultRSK.innerHTML;
}

// рассчёт БЖУ

function countNutrients() {
  let fatRes = +weight.value;
  fat.innerHTML = fatRes;
  let carbohydrateRes = 3 * +weight.value;
  carbohydrate.innerHTML = carbohydrateRes;
  protein.innerHTML = `${
    (+resultGoal() - carbohydrateRes * 4 - fatRes * 9) / 4
  }`;
  return console.log(resultGoal());
}

button.addEventListener("click", function () {
  resultGoal();
  countNutrients();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
});
