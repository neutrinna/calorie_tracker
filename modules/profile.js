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

// РСК c учётом цели

function resultGoal() {
  if (goal.value == "lose-weight") {
    resultRSK.innerHTML = Math.round(+getNormRSK() - +getNormRSK() * rateGole);
  } else if (goal.value == "maintenance") {
    resultRSK.innerHTML = Math.round(+getNormRSK());
  } else if (goal.value == "gain") {
    resultRSK.innerHTML = Math.round(+getNormRSK() + +getNormRSK() * rateGole);
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
}

// рассчёт эффективного веса

function countWeight() {
  optimalWeight.innerHTML = `${Math.round(
    +growth.value - 100 - (growth.value - 150) / 2
  )} кг`;
}

button.addEventListener("click", function () {
  resultGoal();
  countNutrients();
  countWeight();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
});
// Nastya Klm

// ИННА

// chart
const doughnut = document.getElementById("doughnut");

new Chart(doughnut, {
  type: "doughnut",
  data: {
    // labels: ['Выполнено за неделю', 'Не выполнено за неделю'],
    datasets: [
      {
        // label: 'Задач',
        data: [5, 6, 8],
        borderWidth: 1,
        backgroundColor: ["#E16527", "#089BAA", "#FCDC29"],
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

// ИННА


// АЛЕКСАНДРА

const waterAmount = document.querySelector(".profile-user__water-amount_data");
waterAmount.textContent = `${localStorage.getItem('WaterTracker')} мл`;

