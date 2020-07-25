const url = 'https://covid19.mathdro.id/api';

fetchData();

fetchDailyData();

async function fetchData () {
    try {
        const { data : { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);

        let confirmedElement = document.getElementById('confirmed');
        let recoveredElement = document.getElementById('recovered');
        let deathsElement = document.getElementById('deaths');
        let lastUpdateElements = document.getElementsByClassName('last-update');
        
        confirmedElement.innerHTML = formatNumber(confirmed.value);
        recoveredElement.innerHTML = formatNumber(recovered.value);
        deathsElement.innerHTML = formatNumber(deaths.value);
        
        for (var i = 0; i < lastUpdateElements.length; i++) {
            lastUpdateElements[i].innerHTML = 'Last Update: ' + new Date(lastUpdate).toDateString();
        }

        $('.counter').counterUp({
            delay: 10,
            time: 1000,
            offset: 70,
            beginAt: 100,
        });
    } catch (error) {
        console.log(error);
    }
}

async function fetchDailyData() {
    try {
        const { data } = await axios.get(`${url}/daily`);
        
        const simplifiedData = data.map((dailyData) => ({
            confirmed : dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        let selectedChart = document.getElementById('coronaChart').getContext('2d');

        Chart.defaults.global.defaultFontSize = 18;
        Chart.defaults.global.defaultFontColor = '#777';

        let coronaChart = new Chart(selectedChart, {
            type:'line',
            data: {
                labels: simplifiedData.map(({date}) => date),
                datasets: [{
                    data: simplifiedData.map(({ confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: simplifiedData.map(({ deaths }) => deaths),
                    label: 'Death',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0, 2.5)',
                    fill: true,
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 10
                        }
                    }]
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function formatNumber(number) {
    return numeral(number).format('0,0');
} 

