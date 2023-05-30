// Настя Кольцова

// charts js section

const currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

// настройки графика веса

const weightGraph = document.getElementById('charts-weight__current-lb');

const updateChart = () => {
    const weightList = JSON.parse(localStorage.getItem('weightList')) || {};
    const dates = Object.keys(weightList).sort();
    chart.data.labels = dates;
    chart.data.datasets[0].data = dates.map((date) => {
        const weights = weightList[date];
        return weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
    });
    chart.update();
};

const chart = new Chart(weightGraph, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'вес, кг',
            data: [],
            borderWidth: 1,
            backgroundColor: "#F7C78E",
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Ввод и сохранение веса

const weightInput = document.getElementById('charts-weight-input');
const dateInput = document.getElementById('charts-date-input');
const addButton = document.querySelector('.charts-add-weight-btn');

const validateWeight = () => {
    const weight = weightInput.value;
    localStorage.setItem('weightForWaterTracker', `${weight}`);
    if (isNaN(weight) || weight === '' || weight <= 0) {
        alert('Введите корректное значение веса.');
        return false;
    }
    return true;
};

const roundWeight = (weight) => {
    return Math.round(weight * 10) / 10;
};

const saveWeight = () => {
    const weight = roundWeight(weightInput.value);
    const date = dateInput.value;
    const weightList = JSON.parse(localStorage.getItem('weightList')) || {};
    if (!weightList[date]) {
        weightList[date] = [weight];
    } else {
    weightList[date].push(weight);
    }
    localStorage.setItem('weightList', JSON.stringify(weightList));
    displayWeights();
};

const getWeightsByDate = (date) => {
    const weightList = JSON.parse(localStorage.getItem('weightList')) || {};
    if (weightList[date]) {
        return weightList[date];
    } else {
        return [];
    }
};

const displayWeights = () => {
    const weightList = document.getElementById('weightList');
    weightList.innerHTML = '';
    const dates = Object.keys(JSON.parse(localStorage.getItem('weightList') || {}));
    const today = new Date().toISOString().slice(0, 10);
    if (dates.includes(today)) {
        const weights = getWeightsByDate(today);
        const lastWeight = weights[weights.length - 1];
        const actualWeight = document.querySelector('.charts-weight__actual p');
        actualWeight.textContent = `Ваш вес - ${lastWeight} кг`;
        
        if (currentUser && Array.isArray(currentUser)) {
            const lastWeight = weights[weights.length - 1];
            currentUser[4] = lastWeight;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }
    dates.forEach((date) => {
        const weightListItem = document.createElement('li');
        const weights = getWeightsByDate(date);
        const weightListItems = weights.map((weight) => {
            return '<li>' + weight + '</li>';
        }).join('');
        weightListItem.innerHTML = `
            <h3>${date}</h3>
            <ul>
            ${weightListItems}
            </ul>
        `;
        weightList.appendChild(weightListItem);
    });
    updateChart();
};


addButton.addEventListener('click', () => {
    if (validateWeight()) {
        saveWeight();
        weightInput.value = '';
        addButton.disabled = true;
    }
});

weightInput.addEventListener('input', validateInputs);
dateInput.addEventListener('change', validateInputs);

displayWeights();
updateChart();

function validateInputs() {
    const weight = Number(weightInput.value);
    if (isNaN(weight) || weight <= 0) {
        addButton.disabled = true;
        return false;
    }

    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    if (selectedDate < today) {
        addButton.disabled = false;
    } else {
        addButton.disabled = true;
    }

    if (weight && selectedDate && !addButton.disabled) {
        addButton.disabled = false;
    } else {
        addButton.disabled = true;
    }
}

weightInput.addEventListener('input', validateInputs);
dateInput.addEventListener('change', validateInputs);

// Вывод данных калорий и макроэлементов в диаграмму

const getAmount = (key) => parseInt(localStorage.getItem(key), 10);

const calculatePercentageAndHeight = (amount, totalCount) => ({
    height: `${(amount / totalCount) * 100}%`,
    percentage: `${Math.round((amount / totalCount) * 100)}%`,
    kcal: `${amount} ккал`,
});

const updateColumn = (column, amount, totalCount, legendItem) => {
    const { height, percentage, kcal } = calculatePercentageAndHeight(amount, totalCount);
    const formattedPercentage = isNaN(percentage) ? 0 : percentage;
    const formattedKcal = isNaN(kcal) ? 0 : kcal;
    column.style.height = height;
    legendItem.innerHTML = `<p>${formattedPercentage}% (${formattedKcal} ккал)</p>`;
};  

// const updateColumn = (column, amount, totalCount, legendItem) => {
//     const { height, percentage, kcal } = calculatePercentageAndHeight(amount, totalCount);
//     column.style.height = height;
//     legendItem.innerHTML = `<p>${percentage} (${kcal})</p>`;
// };

const updateCalorieChart = () => {
    const breakfastAmount = getAmount('breakfastAmount');
    const lunchAmount = getAmount('lunchAmount');
    const dinnerAmount = getAmount('dinnerAmount');
    const snackAmount = getAmount('snackAmount');
    const totalCountCalorie = breakfastAmount + lunchAmount + dinnerAmount + snackAmount;

    const yellowColumnCalorie = document.querySelector('.charts-calorie__diagram-yellow');
    const greenColumnCalorie = document.querySelector('.charts-calorie__diagram-green');
    const redColumnCalorie = document.querySelector('.charts-calorie__diagram-red');
    const saladColumnCalorie = document.querySelector('.charts-calorie__diagram-salad');

    const yellowLegendCalorie = document.querySelector('.charts-calorie__legend-item__breakfast');
    const greenLegendCalorie = document.querySelector('.charts-calorie__legend-item__lunch');
    const redLegendCalorie = document.querySelector('.charts-calorie__legend-item__dinner');
    const saladLegendCalorie = document.querySelector('.charts-calorie__legend-item__snack');

    updateColumn(yellowColumnCalorie, breakfastAmount, totalCountCalorie, yellowLegendCalorie);
    updateColumn(greenColumnCalorie, lunchAmount, totalCountCalorie, greenLegendCalorie);
    updateColumn(redColumnCalorie, dinnerAmount, totalCountCalorie, redLegendCalorie);
    updateColumn(saladColumnCalorie, snackAmount, totalCountCalorie, saladLegendCalorie);
};

const updateMacroChart = () => {
    const carboAmount = getAmount('carboAmount');
    const proteinAmount = getAmount('proteinAmount');
    const fatsAmount = getAmount('fatsAmount');
    const totalCountMacro = carboAmount + proteinAmount + fatsAmount;

    const greenColumnMacro = document.querySelector('.charts-macro__diagram-green');
    const redColumnMacro = document.querySelector('.charts-macro__diagram-red');
    const yellowColumnMacro = document.querySelector('.charts-macro__diagram-yellow');

    const greenLegendMacro = document.querySelector('.charts-macro__legend-item__carbo');
    const redLegendMacro = document.querySelector('.charts-macro__legend-item__protein');
    const yellowLegendMacro = document.querySelector('.charts-macro__legend-item__fats');

    updateColumn(greenColumnMacro, carboAmount, totalCountMacro, greenLegendMacro);
    updateColumn(redColumnMacro, proteinAmount, totalCountMacro, redLegendMacro);
    updateColumn(yellowColumnMacro, fatsAmount, totalCountMacro, yellowLegendMacro);
};

updateCalorieChart();
updateMacroChart();


// Разница с целевым весом

const getEarliestWeight = (weights) => {
    if (weights.length > 0) {
        const sortedWeights = weights.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedWeights[0].weight;
    }
    return 0;
};

const updateWeightInfo = () => {
    const today = new Date().toISOString().slice(0, 10);
    const weights = getWeightsByDate(today);

    const lastWeight = weights[weights.length - 1] || undefined;
    const targetWeight = parseInt(localStorage.getItem('targetWeight'), 10) || undefined;
    const earliestWeight = getEarliestWeight(weights);

    const dropped = (lastWeight && targetWeight && earliestWeight) ? (lastWeight - earliestWeight - targetWeight) : 0;
    const remained = (lastWeight && targetWeight) ? (targetWeight - lastWeight) : 0;

    const droppedText = document.querySelector('.charts-grid-weight-dropped-text');
    const remainedText = document.querySelector('.charts-grid-weight-remained-text');

    droppedText.innerHTML = `Сброшено <span class="charts-kg-red">${dropped} кг</span>`;
    remainedText.innerHTML = `Осталось <span class="charts-kg-green">${remained} кг</span>`;
};

updateWeightInfo();

// Кнопка сброса веса

const resetButton = document.querySelector('.charts-reset__button'); 
resetButton.addEventListener('click', function() {
    localStorage.removeItem('weightList');
    location.reload();
});