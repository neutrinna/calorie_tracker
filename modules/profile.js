// Инна
let user = JSON.parse(localStorage.getItem("currentUser"));
const profileUserData = new Object();
// localStorage.clear()

render()
// Инна

// Nastya Klm
const form = document.getElementById("form-rsk");
const button = document.querySelector(".calculate-rsk");

const goal = document.getElementById("goal");
const age = document.querySelector(".input-age");
const gender = document.getElementById("gender");
const activity = document.getElementById("activity");
const weight = document.querySelector(".input-weight");
const growth = document.querySelector(".input-growth");

const resultRSK = document.querySelector(".result-rsk");
const protein = document.querySelector(".proteins");
const fat = document.querySelector(".fats");
const carbohydrate = document.querySelector(".carbohydrates");
const optimalWeight = document.querySelector(".optimal-weight");

const rateGole = 0.2;

// норма РСК без учёта цели

const getNormRSK = function () {
  if (gender.value == "male") {
    resultRSK.innerHTML = Math.round(
      `${(9.99 * +weight.value + 6.25 * +growth.value - 4.92 * +age.value + 5) *
      +activity.value
      }`
    );
  } else if (gender.value == "female") {
    resultRSK.innerHTML = Math.round(
      `${(9.99 * +weight.value +
        6.25 * +growth.value -
        4.92 * +age.value -
        161) *
      +activity.value
      }`
    );
  }
  if (localStorage.getItem("loged") === "true") {
    profileUserData.growth = growth.value;
    profileUserData.weight = weight.value;
    console.log(resultRSK.innerHTML);
  }
  return resultRSK.innerHTML;
};

// РСК c учётом цели

function resultGoal() {
  if (goal.value == "lose-weight") {
    resultRSK.innerHTML = Math.round(+getNormRSK() - +getNormRSK() * rateGole);
  } else if (goal.value == "maintenance") {
    resultRSK.innerHTML = Math.round(+getNormRSK());
  } else if (goal.value == "gain") {
    resultRSK.innerHTML = Math.round(+getNormRSK() + +getNormRSK() * rateGole);
  }
  if (localStorage.getItem("loged") === "true") {
    profileUserData.kkal = resultRSK.textContent;
  }
  return resultRSK.innerHTML;
}

// рассчёт БЖУ

function countNutrients() {
  if (goal.value == "lose-weight") {
    protein.innerHTML = `${Math.round((+resultGoal() * 25) / 100 / 4)} г`;
    fat.innerHTML = `${Math.round((+resultGoal() * 35) / 100 / 9)} г`;
    carbohydrate.innerHTML = `${Math.round((+resultGoal() * 40) / 100 / 4)} г`;
  } else if (goal.value == "maintenance" || goal.value == "gain") {
    protein.innerHTML = `${Math.round((+resultGoal() * 20) / 100 / 4)} г`;
    fat.innerHTML = `${Math.round((+resultGoal() * 30) / 100 / 9)} г`;
    carbohydrate.innerHTML = `${Math.round((+resultGoal() * 50) / 100 / 4)} г`;
  }
  if (localStorage.getItem("loged") === "true") {
    profileUserData.prot = protein.textContent;
    profileUserData.fat = fat.textContent;
    profileUserData.carbs = carbohydrate.textContent;
  }
}

// рассчёт эффективного веса

function countWeight() {
  optimalWeight.innerHTML = `${Math.round(
    +growth.value - 100 - (growth.value - 150) / 2
  )} кг`;
  if (localStorage.getItem("loged") === "true") {
    profileUserData.goal = optimalWeight.textContent
  }
}

function validationInputs() {
  if (age.value == "") {
    age.style.borderColor = "#FF7C02";
  }
  if (weight.value == "") {
    weight.style.borderColor = "#FF7C02";
  }
  if (growth.value == "") {
    growth.style.borderColor = "#FF7C02";
  }
}
// Инна
function importRSK() {
  user[5] = profileUserData;
  localStorage.setItem(`currentUser`, JSON.stringify(user));
}

function setValues() {
  {const user = JSON.parse(localStorage.getItem(`currentUser`));

    document.querySelector(".profile-user__target-weight").textContent =
      `${user[5].goal}`;
    document.querySelector(
      ".profile-user__states-value_growth"
    ).textContent = `${user[5].growth} кг`;
    document.querySelector(".profile-user__states-value_weight").textContent = `${user[5].weight} кг`;
    document.querySelector(".profile-user__kkal-amount_left").textContent = `${user[5].kkal -
      document.querySelector(".profile-user__kkal-amount_eaten").textContent}`
  }
}
// Инна

button.addEventListener("click", function () {
  if (age.value !== "" && weight.value !== "" && growth.value !== "") {
    resultGoal();
    countNutrients();
    countWeight();
  }
    if (document.getElementById("profile-RSK__checkbox").checked === true) {
      importRSK();
      setValues();
    }
 else {
    alert("Заполните все поля!");
    validationInputs();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
});
// Nastya Klm

// ИННА
// chart
const doughnut = document.getElementById("doughnut");
const macro = document.querySelectorAll(`.profile-user__macro-amount_span`);
const macroAmount = [];

for (let macroElement of macro) {
  macroAmount.push(`${macroElement.textContent}`);
}

new Chart(doughnut, {
  type: "doughnut",
  data: {
    // labels: ['Углеводы', 'Белки', 'Жиры'],
    datasets: [{
      label: "грамм",
      data: macroAmount,
      borderWidth: 1,
      backgroundColor: ["#089BAA", "#E16527", "#FCDC29"],
      borderColor: [
        "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.7)",
      ],
    }, ],
  },
});
// chart

// date
let kkalTaken = 0;
const kkalTakenNode = document.querySelector(`.profile-user__kkal-amount`);

for (let i = 0; i < macroAmount.length; i++) {
  i === 2 ?
    (kkalTaken += macroAmount[i] * 9) :
    (kkalTaken += macroAmount[i] * 4);
}

kkalTakenNode.textContent = `${Math.round(kkalTaken)}`;
// date

// time
const dateNode = document.querySelector(`.profile-user__date-value`);
dateNode.textContent = moment().format("DD/MM/YYYY");
// time

function render() {
  document.getElementById("profile-user__data-name").textContent = `${user[0]}`;
  document.getElementById(
    "profile-user__data-age"
  ).textContent = `Возраст: ${user[1]}`;
  // page load
  if (localStorage.getItem("loged") === "true") {

    document.getElementById("profile-welcome__wripper").style.display = "none";
    document.getElementById("profile-paternity").style.display = "none";
    document.getElementById("profile-user").style.display = "flex";
    document.querySelector(".profile-RSK__checkbox").style.display = "flex";
    // АЛЕКСАНДРА
    // данные трекера воды

    const waterAmount = document.querySelector(".profile-user__water-amount_data");
    console.log(typeof user[2]);
    if ((typeof user[2] === "undefined") || (user[2] === `null`)) {
      waterAmount.textContent = "0 мл";
    } else {
      waterAmount.textContent = `${user[2]} мл`;
      // Настя Кольцова
      // значение целевого веса
      const targetWeight = document.querySelector(
        ".profile-user__target-weight"
      ).textContent;
      localStorage.setItem("targetWeight", targetWeight);
      // Настя Кольцова

      document.querySelector(".profile-user__target-weight").textContent =
        `${user[5].goal} ` || `-`;
      document.querySelector(
        ".profile-user__states-value_growth"
      ).textContent = `${user[5].growth} кг` || `-`;
      document.querySelector(".profile-user__states-value_weight").textContent = `${user[5].weight} кг` || `-`;
      document.querySelector(".profile-user__kkal-amount_left").textContent = `${user[5].kkal -
    document.querySelector(".profile-user__kkal-amount_eaten").textContent}` || `-`;
      resultRSK.textContent = `${user[5].kkal}` || `-`;
      protein.textContent = `${user[5].prot}` || `-`;
      fat.textContent = `${user[5].fat}` || `-`;
      carbohydrate.textContent = `${user[5].carbs}` || `-`;
      optimalWeight.textContent = `${user[5].goal}` || `-`;
    }
  }
}
// Инна
