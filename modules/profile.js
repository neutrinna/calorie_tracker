// ИННА

// chart
const doughnut = document.getElementById('doughnut');
const macro = document.querySelectorAll(`.profile-user__macro-amount_span`);
const macroAmount = [];

for(let macroElement of macro){
    macroAmount.push(`${macroElement.textContent}`);
}


new Chart(doughnut, {
    type: 'doughnut',
    data: {
        // labels: ['Углеводы', 'Белки', 'Жиры'],
        datasets: [{
            label: 'грамм',
            data: macroAmount,
            borderWidth: 1,
            backgroundColor: ['#089BAA','#E16527', '#FCDC29'],
            borderColor: ['rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)']
        }]
    }
});
// chart


// data
let kkalTaken = 0;
const kkalTakenNode = document.querySelector(`.profile-user__kkal-amount`);

for (let i=0; i<macroAmount.length; i++){
    i===2? kkalTaken += macroAmount[i]*9: kkalTaken += macroAmount[i]*4;
}

kkalTakenNode.textContent = `${Math.round(kkalTaken)}`;
// data

// time
const dateNode = document.querySelector(`.profile-user__date-value`);
dateNode.textContent = moment().format("DD/MM/YYYY")

// time

// ИННА