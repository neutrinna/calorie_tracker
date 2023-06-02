// Инна
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
// localStorage.clear()

render();
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
render();
// норма РСК без учёта цели

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
  if (localStorage.getItem("loged") === "true") {
    currentUser.growth = growth.value;
    currentUser.weight = weight.value;
  }
  console.log(resultRSK.innerHTML);
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
    currentUser.kkal = resultRSK.textContent;
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
    currentUser.prot = protein.textContent;
    currentUser.fat = fat.textContent;
    currentUser.carbs = carbohydrate.textContent;
  }
}

// рассчёт эффективного веса

function countWeight() {
  optimalWeight.innerHTML = `${Math.round(
    +growth.value - 100 - (growth.value - 150) / 2
  )} кг`;
  if (localStorage.getItem("loged") === "true") {
    currentUser.goal = optimalWeight.textContent;
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
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
}

function setValues() {
  document.querySelector(
    ".profile-user__target-weight"
  ).textContent = `${currentUser.goal}`;
  document.querySelector(
    ".profile-user__states-value_growth"
  ).textContent = `${currentUser.growth} кг`;
  document.querySelector(
    ".profile-user__states-value_weight"
  ).textContent = `${currentUser.weight} кг`;
  document.querySelector(".profile-user__kkal-amount_left").textContent = `${
    currentUser.kkal -
    document.querySelector(".profile-user__kkal-amount_eaten").textContent
  }`;
}
// Инна

button.addEventListener("click", function () {
  if (age.value !== "" && weight.value !== "" && growth.value !== "") {
    resultGoal();
    countNutrients();
    countWeight();
  }
  if (document.getElementById("profile-RSK__checkbox").checked === true) {
    setValues();
    importRSK();
  } else {
    alert("Заполните все поля!");
    validationInputs();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
});
// Nastya Klm

// Инна
function importRSK() {
  user[5] = profileUserData;
  localStorage.setItem(`currentUser`, JSON.stringify(user));
}

function setValues() {
  if (document.getElementById("profile-RSK__checkbox").checked == true) {
    const user = JSON.parse(localStorage.getItem(`currentUser`));

    document.querySelector(
      ".profile-user__target-weight"
    ).textContent = `${user[5].goal}`;
    document.querySelector(
      ".profile-user__states-value_growth"
    ).textContent = `${user[5].growth} кг`;
    document.querySelector(
      ".profile-user__states-value_weight"
    ).textContent = `${user[5].weight} кг`;
    document.querySelector(".profile-user__kkal-amount_left").textContent = `${
      user[5].kkal -
      document.querySelector(".profile-user__kkal-amount_eaten").textContent
    }`;
  }
}
// Инна

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
    datasets: [
      {
        label: "грамм",
        data: macroAmount,
        borderWidth: 1,
        backgroundColor: ["#089BAA", "#E16527", "#FCDC29"],
        borderColor: [
          "rgba(0, 0, 0, 0.7)",
          "rgba(0, 0, 0, 0.7)",
          "rgba(0, 0, 0, 0.7)",
        ],
      },
    ],
  },
});
// chart

// data
let kkalTaken = 0;
const kkalTakenNode = document.querySelector(`.profile-user__kkal-amount`);

for (let i = 0; i < macroAmount.length; i++) {
  i === 2
    ? (kkalTaken += macroAmount[i] * 9)
    : (kkalTaken += macroAmount[i] * 4);
}

kkalTakenNode.textContent = `${Math.round(kkalTaken)}`;
// data

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

    const waterAmount = document.querySelector(
      ".profile-user__water-amount_data"
    );
    console.log(typeof user[2]);
    if (typeof user[2] === "undefined" || user[2] === `null`) {
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
      document.querySelector(".profile-user__states-value_growth").textContent =
        `${user[5].growth} кг` || `-`;
      document.querySelector(".profile-user__states-value_weight").textContent =
        `${user[5].weight} кг` || `-`;
      document.querySelector(".profile-user__kkal-amount_left").textContent =
        `${
          user[5].kkal -
          document.querySelector(".profile-user__kkal-amount_eaten").textContent
        }` || `-`;
      resultRSK.textContent = `${user[5].kkal}` || `-`;
      protein.textContent = `${user[5].prot}` || `-`;
      fat.textContent = `${user[5].fat}` || `-`;
      carbohydrate.textContent = `${user[5].carbs}` || `-`;
      optimalWeight.textContent = `${user[5].goal}` || `-`;
    }
  }
}
// Инна
// time
const dateNode = document.querySelector(`.profile-user__date-value`);
dateNode.textContent = moment().format("DD/MM/YYYY");
// time

// page load
if (localStorage.getItem("loged") === "true") {
  document.getElementById("profile-welcome__wripper").style.display = "none";
  document.getElementById("profile-paternity").style.display = "none";
  document.getElementById("profile-user").style.display = "flex";
  document.querySelector(".profile-RSK__checkbox").style.display = "flex";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById(
    "profile-user__data-name"
  ).textContent = `${currentUser.name} ${currentUser.surname}`;
  document.getElementById(
    "profile-user__data-age"
  ).textContent = `Возраст: ${currentUser.age}`;

  const waterAmount = document.querySelector(
    ".profile-user__water-amount_data"
  );
  if (
    typeof currentUser.water === "undefined" ||
    currentUser.water === `null`
  ) {
    waterAmount.textContent = "0 мл";
  } else {
    waterAmount.textContent = `${currentUser.water} мл`;
  }

  // Настя Кольцова
  // значение целевого веса
  const targetWeight = document.querySelector(
    ".profile-user__target-weight"
  ).textContent;
  localStorage.setItem("targetWeight", targetWeight);
  // Настя Кольцова

  if (typeof currentUser.goal === "undefined" || currentUser.goal === `null`) {
    document.querySelector(".profile-user__target-weight").textContent = `-`;
  } else {
    document.querySelector(
      ".profile-user__target-weight"
    ).textContent = `${currentUser.goal} `;
  }

  if (
    typeof currentUser.growth === "undefined" ||
    currentUser.growth === `null`
  ) {
    document.querySelector(
      ".profile-user__states-value_growth"
    ).textContent = `-`;
  } else {
    document.querySelector(
      ".profile-user__states-value_growth"
    ).textContent = `${currentUser.growth} см`;
  }

  if (
    typeof currentUser.weight === "undefined" ||
    currentUser.weight === `null`
  ) {
    document.querySelector(
      ".profile-user__states-value_weight"
    ).textContent = `-`;
  } else {
    document.querySelector(
      ".profile-user__states-value_weight"
    ).textContent = `${currentUser.weight} кг`;
  }
  if (
    typeof currentUser.total.kkal === "undefined" ||
    currentUser.total.kkal === `null`
  ) {
    document.querySelector(
      ".profile-user__kkal-amount_eaten"
    ).textContent = `-`;
  } else {
    document.querySelector(
      ".profile-user__kkal-amount_eaten"
    ).textContent = `${currentUser.total.kkal}`;
  }

  if (typeof currentUser.kkal === "undefined" || currentUser.kkal === `null`) {
    document.querySelector(".profile-user__kkal-amount_left").textContent = `-`;
    resultRSK.textContent = `-`;
  } else {
    document.querySelector(".profile-user__kkal-amount_left").textContent = `${
      currentUser.kkal - currentUser.total.kkal
    }`;
    resultRSK.textContent = `${currentUser.kkal}`;
  }

  if (typeof currentUser.prot === "undefined" || currentUser.prot === `null`) {
    protein.textContent = `-`;
  } else {
    protein.textContent = `${currentUser.prot}`;
  }

  if (typeof currentUser.fat === "undefined" || currentUser.fat === `null`) {
    fat.textContent = `-`;
  } else {
    fat.textContent = `${currentUser.fat}`;
  }

  if (
    typeof currentUser.carbs === "undefined" ||
    currentUser.carbs === `null`
  ) {
    carbohydrate.textContent = `-`;
  } else {
    carbohydrate.textContent = `${currentUser.carbs}`;
  }

  if (typeof currentUser.goal === "undefined" || currentUser.goal === `null`) {
    optimalWeight.textContent = `-`;
  } else {
    optimalWeight.textContent = `${currentUser.goal}`;
  }

  // scales
  if (
    typeof currentUser.total.carbs === "undefined" ||
    currentUser.total.carbs === `null`
  ) {
    document.querySelector(
      ".profile-user__macro-amount_carbs"
    ).textContent = ``;
    document.querySelector(
      ".profile-user__macro-scale-line_carbs"
    ).style.width = `0%`;
  } else {
    document.querySelector(
      ".profile-user__macro-amount_carbs"
    ).textContent = `${currentUser.total.carbs}`;
    if ((currentUser.total.carbs / currentUser.carbs) * 100 > 100) {
      document.querySelector(
        ".profile-user__macro-scale-line_carbs"
      ).style.width = `100%`;
      document.querySelector(
        ".profile-user__macro-scale-line_carbs"
      ).style.backgroundColor = `red`;
    } else {
      document.querySelector(
        ".profile-user__macro-scale-line_carbs"
      ).style.width = `${(currentUser.total.carbs / currentUser.carbs) * 100}%`;
    }
  }

  if (
    typeof currentUser.total.proteins === "undefined" ||
    currentUser.total.proteins === `null`
  ) {
    document.querySelector(".profile-user__macro-amount_prot").textContent = ``;
  } else {
    document.querySelector(
      ".profile-user__macro-amount_prot"
    ).textContent = `${currentUser.total.proteins}`;
    if ((currentUser.total.proteins / currentUser.prot) * 100 > 100) {
      document.querySelector(
        ".profile-user__macro-scale-line_protein"
      ).style.width = `100%`;
      document.querySelector(
        ".profile-user__macro-scale-line_protein"
      ).style.backgroundColor = `red`;
    } else {
      document.querySelector(
        ".profile-user__macro-scale-line_protein"
      ).style.width = `${
        (currentUser.total.proteins / currentUser.prot) * 100
      }%`;
    }
  }
  if (
    typeof currentUser.total.fats === "undefined" ||
    currentUser.total.fats === `null`
  ) {
    document.querySelector(".profile-user__macro-amount_fat").textContent = ``;
  } else {
    document.querySelector(
      ".profile-user__macro-amount_fat"
    ).textContent = `${currentUser.total.fats}`;
    if ((currentUser.total.fats / currentUser.fat) * 100 > 100) {
      document.querySelector(
        ".profile-user__macro-scale-line_fat"
      ).style.width = `100%`;
      document.querySelector(
        ".profile-user__macro-scale-line_fat"
      ).style.backgroundColor = `red`;
    } else {
      document.querySelector(
        ".profile-user__macro-scale-line_fat"
      ).style.width = `${(currentUser.total.fats / currentUser.fat) * 100}%`;
    }
  }
}
// Инна
