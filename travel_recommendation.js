document.getElementById('btnSearch').addEventListener('click', () => {
    const keyword = document.getElementById('destinationInput').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const recommendations = getRecommendations(data, keyword);
            displayRecommendations(recommendations);
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('destinationInput').value = '';
    document.getElementById('recommendations').innerHTML = '';
});

function getRecommendations(data, keyword) {
    let results = [];
    if (keyword.includes('beach')) {
        results = data.beaches;
    } else if (keyword.includes('temple')) {
        results = data.temples;
    } else {
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(keyword)) {
                    results.push(city);
                }
            });
        });
    }
    return results;
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = ''; // Clear previous results
    if (recommendations.length > 0) {
        recommendations.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('recommendation-card');
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>No recommendations found.</p>';
    }
}
