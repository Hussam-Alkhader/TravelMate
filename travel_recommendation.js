document.addEventListener('DOMContentLoaded', () => {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});


document.getElementById('btnSearch').addEventListener('click', () => {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];

            if (input.includes('beach')) {
                results = data.beaches;
            } else if (input.includes('temple')) {
                results = data.temples;
            } else {
                results = data.countries.flatMap(country => country.cities.filter(city => city.name.toLowerCase().includes(input)));
            }

            displayRecommendations(results);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayRecommendations(results) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      `;
        recommendationsDiv.appendChild(card);
    });
}


function displayRecommendations(results) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.float = 'right';
        card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      `;
        recommendationsDiv.appendChild(card);
    });
}


document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('recommendations').innerHTML = '';
    document.getElementById('destinationInput').value = '';
});
