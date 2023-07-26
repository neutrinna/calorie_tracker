// Инна
// localStorage.clear()

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
  let preResultRSK;
  if (gender.value == "male") {
    preResultRSK = Math.round(
      `${
        (9.99 * +weight.value + 6.25 * +growth.value - 4.92 * +age.value + 5) *
        +activity.value
      }`
    );
  } else if (gender.value == "female") {
    preResultRSK = Math.round(
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
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(growth.value, weight.value);
    currentUser.growth = growth.value;
    currentUser.weight = weight.value;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  }

  return preResultRSK;
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
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.kkal = resultRSK.textContent;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  }
  return resultRSK.innerHTML;
}

// рассчёт БЖУ

function countNutrients() {
  let protAmount;
  let fatAmount;
  let carbAmount;

  if (goal.value == "lose-weight") {
    protAmount = `${Math.round((+resultGoal() * 25) / 100 / 4)}`;
    fatAmount = `${Math.round((+resultGoal() * 35) / 100 / 9)}`;
    carbAmount = `${Math.round((+resultGoal() * 40) / 100 / 4)}`;

    protein.innerHTML = `${protAmount} г`;
    fat.innerHTML = `${fatAmount} г`;
    carbohydrate.innerHTML = `${carbAmount} г`;
  } else if (goal.value == "maintenance" || goal.value == "gain") {
    protAmount = `${Math.round((+resultGoal() * 20) / 100 / 4)}`;
    fatAmount = `${Math.round((+resultGoal() * 30) / 100 / 9)}`;
    carbAmount = `${Math.round((+resultGoal() * 50) / 100 / 4)}`;

    protein.innerHTML = `${protAmount} г`;
    fat.innerHTML = `${fatAmount} г`;
    carbohydrate.innerHTML = `${carbAmount} г`;
  }
  if (localStorage.getItem("loged") === "true") {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.prot = protAmount;
    currentUser.fat = fatAmount;
    currentUser.carbs = carbAmount;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  }
}

// рассчёт эффективного веса

function countWeight() {
  optimalWeight.innerHTML = `${Math.round(
    +growth.value - 100 - (growth.value - 150) / 2
  )} кг`;
  if (localStorage.getItem("loged") === "true") {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.goal = optimalWeight.textContent;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
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

button.addEventListener("click", function () {
  if (age.value !== "" && weight.value !== "" && growth.value !== "") {
    resultGoal();
    countNutrients();
    countWeight();
  }
  if (document.getElementById("profile-RSK__checkbox").checked === true) {
    render();
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

// ИННА
// chart

function render() {
  document.querySelector(".profile-user__doughnut-chart").innerHTML = `<canvas id="doughnut"></canvas>`;

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

    // time
    const dateNode = document.querySelector(`.profile-user__date-value`);
    dateNode.textContent = moment().format("DD/MM/YYYY");
    // time

    // chart
    const doughnut = document.getElementById("doughnut");
    let macroAmount = [];

    try {
      macroAmount = [
        currentUser.total.carbs,
        currentUser.total.proteins,
        currentUser.total.fats,
      ];
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
    } catch {
    }
    
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

    if (
      typeof currentUser.goal === "undefined" ||
      currentUser.goal === `null`
    ) {
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
      typeof currentUser.prot === "undefined" ||
      currentUser.prot === `null`
    ) {
      protein.textContent = `-`;
    } else {
      protein.textContent = `${currentUser.prot} г`;
    }

    if (typeof currentUser.fat === "undefined" || currentUser.fat === `null`) {
      fat.textContent = `-`;
    } else {
      fat.textContent = `${currentUser.fat} г`;
    }

    if (
      typeof currentUser.carbs === "undefined" ||
      currentUser.carbs === `null`
    ) {
      carbohydrate.textContent = `-`;
    } else {
      carbohydrate.textContent = `${currentUser.carbs} г`;
    }

    if (
      typeof currentUser.goal === "undefined" ||
      currentUser.goal === `null`
    ) {
      optimalWeight.textContent = `-`;
    } else {
      optimalWeight.textContent = `${currentUser.goal}`;
    }

    if (typeof currentUser.kkal === "undefined") {
      resultRSK.textContent = `-`;
    } else {
      resultRSK.textContent = `${currentUser.kkal}`;
    }
    // scales
    try {
      if (typeof currentUser.kkal === "undefined") {
        document.querySelector(
          ".profile-user__kkal-amount_left"
        ).textContent = `-`;
      } else {
        document.querySelector(
          ".profile-user__kkal-amount_left"
        ).textContent = `${currentUser.kkal - currentUser.total.kkal}`;
      }

      document.querySelector(
        ".profile-user__kkal-amount_eaten"
      ).textContent = `${currentUser.total.kkal}`;

      document.querySelector(
        ".profile-user__macro-amount_carbs"
      ).textContent = `${currentUser.total.carbs} г`;
      if ((currentUser.total.carbs / currentUser.carbs) * 100 > 100) {
        document.querySelector(
          ".profile-user__macro-scale-line_carbs"
        ).style.width = `100%`;
      } else {
        document.querySelector(
          ".profile-user__macro-scale-line_carbs"
        ).style.width = `${
          (currentUser.total.carbs / currentUser.carbs) * 100
        }%`;
      }

      document.querySelector(
        ".profile-user__macro-amount_prot"
      ).textContent = `${currentUser.total.proteins} г`;
      if ((currentUser.total.proteins / currentUser.prot) * 100 > 100) {
        document.querySelector(
          ".profile-user__macro-scale-line_protein"
        ).style.width = `100%`;
      } else {
        document.querySelector(
          ".profile-user__macro-scale-line_protein"
        ).style.width = `${
          (currentUser.total.proteins / currentUser.prot) * 100
        }%`;
      }

      document.querySelector(
        ".profile-user__macro-amount_fat"
      ).textContent = `${currentUser.total.fats} г`;
      if ((currentUser.total.fats / currentUser.fat) * 100 > 100) {
        document.querySelector(
          ".profile-user__macro-scale-line_fat"
        ).style.width = `100%`;
      } else {
        document.querySelector(
          ".profile-user__macro-scale-line_fat"
        ).style.width = `${(currentUser.total.fats / currentUser.fat) * 100}%`;
      }
    } catch {
      document.querySelector(
        ".profile-user__kkal-amount_eaten"
      ).textContent = `-`;
      document.querySelector(
        ".profile-user__kkal-amount_left"
      ).textContent = `-`;
      // resultRSK.textContent = `-`;

      document.querySelector(
        ".profile-user__macro-amount_carbs"
      ).textContent = ``;
      document.querySelector(
        ".profile-user__macro-scale-line_carbs"
      ).style.width = `0%`;

      document.querySelector(
        ".profile-user__macro-amount_prot"
      ).textContent = ``;
      document.querySelector(
        ".profile-user__macro-scale-line_protein"
      ).style.width = `0%`;

      document.querySelector(
        ".profile-user__macro-amount_fat"
      ).textContent = ``;
      document.querySelector(
        ".profile-user__macro-scale-line_fat"
      ).style.width = `0%`;
    }
  }
}

// Инна
