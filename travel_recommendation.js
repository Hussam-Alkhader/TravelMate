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
            } else if (input.includes('country') || input.includes('countries')) {
                results = data.countries.map(country => ({
                    name: country.name,
                    description: `Explore cities like ${country.cities.map(city => city.name).join(', ')}.`,
                    imageUrl: country.cities[0].imageUrl // Use the image of the first city as a placeholder
                }));
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

    if (results.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        recommendationsDiv.appendChild(noResultsMessage);
        return;
    }

    const cards = [];

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.float = 'right';
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        cards.push(card);
        recommendationsDiv.appendChild(card);
    });

    // Calculate the max height
    let maxHeight = 0;
    cards.forEach(card => {
        const cardHeight = card.offsetHeight;
        if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
        }
    });

    // Set all cards to the max height
    cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
    });
}

document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('recommendations').innerHTML = '';
    document.getElementById('destinationInput').value = '';
});
