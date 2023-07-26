// Настя Кольцова

// charts js section

const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
const weightList = currentUser.weightList || {}; 

// Вывод данных калорий и макроэлементов в диаграмму

const calculatePercent = (kkal, total) => {
    return isNaN(parseInt(kkal)) || total === 0 ? 0 : parseInt(kkal) / total * 100;
};

const setColumnHeight = (columnClass, percent) => {
    const column = document.querySelector(`.charts-calorie__diagram-${columnClass}`);
    column.style.height = `${percent}%`;
};

const setLegendItemValue = (itemClass, percent, kkal) => {
    const item = document.querySelector(`.charts-calorie__legend-item__${itemClass}`);
    item.innerHTML = `${percent.toFixed(0)}% (${kkal} ккал)`;
};

const fillMacrosChart = () => {
    try {
        const total = currentUser.total;
        const carbs = parseFloat(total.carbs);
        const proteins = parseFloat(total.proteins);
        const fats = parseFloat(total.fats);

        const totalMacro = carbs + proteins + fats;

        const greenDiagram = document.querySelector('.charts-macro__diagram-green');
        const redDiagram = document.querySelector('.charts-macro__diagram-red');
        const yellowDiagram = document.querySelector('.charts-macro__diagram-yellow');

        const greenHeight = carbs ? (carbs / totalMacro) * 100 : 0;
        const redHeight = proteins ? (proteins / totalMacro) * 100 : 0;
        const yellowHeight = fats ? (fats / totalMacro) * 100 : 0;

        const greenPercent = greenHeight ? `${greenHeight.toFixed(0)}% (${carbs} ккал)` : '0%';
        const redPercent = redHeight ? `${redHeight.toFixed(0)}% (${proteins} ккал)` : '0%';
        const yellowPercent = yellowHeight ? `${yellowHeight.toFixed(0)}% (${fats} ккал)` : '0%';

        const greenLegend = document.querySelector('.charts-macro__legend-item__carbo');
        const redLegend = document.querySelector('.charts-macro__legend-item__protein');
        const yellowLegend = document.querySelector('.charts-macro__legend-item__fats');

        greenLegend.textContent = greenPercent;
        redLegend.textContent = redPercent;
        yellowLegend.textContent = yellowPercent;

        greenDiagram.style.height = greenHeight ? `${greenHeight}%` : '0%';
        redDiagram.style.height = redHeight ? `${redHeight}%` : '0%';
        yellowDiagram.style.height = yellowHeight ? `${yellowHeight}%` : '0%';
    } catch (error) {
        console.error("В дневник не введены данные");
    }
};

const fillCaloriesChart = () => {
    try {
        const totalKkal = parseInt(currentUser.breakfast.kkal) + parseInt(currentUser.lunch.kkal) + parseInt(currentUser.dinner.kkal) + parseInt(currentUser.snack.kkal);
        const meals = [
            {name: 'breakfast', color: 'yellow', kkal: currentUser.breakfast.kkal},
            {name: 'lunch', color: 'green', kkal: currentUser.lunch.kkal},
            {name: 'dinner', color: 'red', kkal: currentUser.dinner.kkal},
            {name: 'snack', color: 'salad', kkal: currentUser.snack.kkal}
        ];

        meals.forEach(meal => {
            const percent = calculatePercent(meal.kkal, totalKkal);
            setColumnHeight(meal.color, percent);
            setLegendItemValue(meal.name, percent, meal.kkal);
        });
    } catch (error) {
        console.error("В дневник не введены данные");
    }
};

fillCaloriesChart();
fillMacrosChart();

// настройки графика веса

const weightGraph = document.getElementById('charts-weight__current-lb');

const updateChart = () => {
    const dates = Object.keys(weightList).sort();
    chart.data.labels = dates;
    chart.data.datasets[0].data = dates.map((date) => {
        const weights = weightList[date];
        return weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
    });
    chart.update();
    currentUser.weightList = weightList;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
        responsive: true,
        maintainAspectRatio: false,
        width: 500,
        height: 500,
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
    if (!weightList[date]) {
        weightList[date] = [weight];
    } else {
        weightList[date].push(weight);
    }
    if(moment(date).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")){
        currentUser.weight = weight;
    }
    currentUser.weightList = weightList;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    displayWeights();
};

const getWeightsByDate = (date) => {
    if (weightList[date]) {
        return weightList[date];
    } else {
        return [];
    }
};

const displayWeights = () => {
    const weightList = document.getElementById('weightList');
    weightList.innerHTML = '';
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const weightListDates = currentUser.weightList ? Object.keys(currentUser.weightList) : [];
    const today = new Date().toISOString().slice(0, 10);

    let lastWeight;
    if (weightListDates.includes(today)) {
        const weights = getWeightsByDate(today);
        lastWeight = weights[weights.length - 1];
    } else {
        lastWeight = currentUser.weight;
    }

    const actualWeight = document.querySelector('.charts-weight__actual p');
    actualWeight.textContent = `Ваш вес - ${lastWeight || ''} кг`;

    weightListDates.forEach((date) => {
        const weightListItem = document.createElement('li');
        const weights = getWeightsByDate(date);
        const weightListItems = weights.map((weight) => `<li>${weight}</li>`);
        weightListItem.innerHTML = `
            <h3>${date}</h3>
            <ul>
                ${weightListItems.join('')}
            </ul>`;
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

    const lastWeight = weights[weights.length - 1];
    const targetWeight = parseFloat(currentUser.goal.split(" ")[0]);
    const earliestWeight = getEarliestWeight(weights) || lastWeight;
    const droppedEl = document.querySelector('.charts-grid-weight-dropped-text');
    const remainedEl = document.querySelector('.charts-grid-weight-remained-text');
    const changesEl = document.querySelector('.charts-weight__changes');

    if (lastWeight === undefined || targetWeight === undefined || isNaN(lastWeight) || isNaN(targetWeight)) {
        droppedEl.innerHTML = `<p class="charts-kg-green">-</p>`;
        remainedEl.innerHTML = `<p class="charts-kg-green">-</p>`;
        return;
    }
    
    if (lastWeight === targetWeight) {
        changesEl.innerHTML = `<p class="charts-kg-green" style="margin-left: 20%">Ваш вес идеален. Вы молодец!</p>`;
        return;
    }

    const isGain = lastWeight < targetWeight;
    const isEarliestGreater = earliestWeight > lastWeight;
    const droppedWeight = isEarliestGreater ? earliestWeight - lastWeight : lastWeight - earliestWeight;
    const remainedWeight = isGain ? targetWeight - lastWeight : lastWeight - targetWeight;
    const droppedText = isGain ? `${droppedWeight} кг набрано` : `${droppedWeight} кг сброшено`;
    const remainedText = `${remainedWeight} кг осталось`;

    droppedEl.innerHTML = `<p class="charts-kg-${isGain ? 'green' : 'red'}">${droppedText}</p>`;
    remainedEl.innerHTML = `<p class="charts-kg-${isGain && isEarliestGreater ? 'red' : 'green'}">${remainedText}</p>`;
};  

updateWeightInfo();

// Кнопка сброса веса

const resetButton = document.querySelector('.charts-reset__button'); 
resetButton.addEventListener('click', function() {
    if (currentUser && currentUser.weightList) {
        currentUser.weightList = {};
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        location.reload();
    }
});

// localStorage.clear();