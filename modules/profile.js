// ИННА

// график
const doughnut = document.getElementById('doughnut');

new Chart(doughnut, {
    type: 'doughnut',
    data: {
        // labels: ['Выполнено за неделю', 'Не выполнено за неделю'],
        datasets: [{
            label: 'Задач',
            data: [5, 6],
            borderWidth: 1,
            backgroundColor: ['rgba(153, 102, 255, 0.7)','rgba(255, 99, 132, 0.7)'],
            borderColor: ['rgb(153, 102, 255)','rgb(255, 99, 132)']
        }]
    }
});
// график
// ИННА