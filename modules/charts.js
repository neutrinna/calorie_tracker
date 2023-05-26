// Настя Кольцова

// charts js section

const getAmount = (key) => parseInt(localStorage.getItem(key), 10);

const calculatePercentageAndHeight = (amount, totalCount) => ({
    height: `${(amount / totalCount) * 100}%`,
    percentage: `${Math.round((amount / totalCount) * 100)}%`,
    kcal: `${amount} ккал`,
});

const updateColumn = (column, amount, totalCount, legendItem) => {
    const { height, percentage, kcal } = calculatePercentageAndHeight(amount, totalCount);
    column.style.height = height;
    legendItem.innerHTML = `<p>${percentage} (${kcal})</p>`;
};

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