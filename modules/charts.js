function calculateCategoryPercentages(data) {
    const categories = ['завтрак', 'обед', 'ужин', 'перекус'];
    const categoryCalories = {};
     // Считаем суммы калорий по категориям
    for (const category of categories) {
        categoryCalories[category] = 0;
    }

    for (const product of data) {
        categoryCalories[product.category] += product.calories;
    }

     // Считаем общее число калорий
    const totalCalories = data.reduce((acc, curr) => acc + curr.calories, 0);
     // Считаем процентное соотношение калорий по категориям
    const categoryPercentages = {};
    
    for (const category of categories) {
        const categoryCalories = categoryCalories[category];
        const percentage = (categoryCalories / totalCalories) * 100;
        categoryPercentages[category] = percentage;
    }
    
    return categoryPercentages;
}
   // Функция для обновления диаграммы
function updateChart(data) {
    // Рассчитываем процентные соотношения калорий по категориям
    const percentages = calculateCategoryPercentages(data);
     // Выбираем элементы диаграммы и меняем их высоту в зависимости от процентного соотношения
    document.querySelector('.charts-calorie__diagram-yellow').style.height = `${percentages['завтрак']}%`;
    document.querySelector('.charts-calorie__diagram-green').style.height = `${percentages['обед']}%`;
    document.querySelector('.charts-calorie__diagram-red').style.height = `${percentages['ужин']}%`;
}