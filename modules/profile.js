// ИННА

// chart
const doughnut = document.getElementById('doughnut');

new Chart(doughnut, {
    type: 'doughnut',
    data: {
        // labels: ['Выполнено за неделю', 'Не выполнено за неделю'],
        datasets: [{
            // label: 'Задач',
            data: [5, 6, 8],
            borderWidth: 1,
            backgroundColor: ['#E16527','#089BAA', '#FCDC29'],
            borderColor: ['rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)']
        }]
    }
});
// chart

// ИННА