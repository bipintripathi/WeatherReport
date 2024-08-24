document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    const weatherInfo = document.getElementById('weather-info');
    const loader = document.getElementById('loader');

    const openWeatherApiKey = '1bb751943343a500033cd1cfc600b9f3'; // Replace with your OpenWeather API key

    // Define a static list of cities
    const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore', 'Chennai', 'Hyderabad', 
        'Ahmedabad', 'Pune', 'Jaipur', 'Surat', 'Kanpur', 'Lucknow', 
        'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Vadodara', 'Ghaziabad', 
        'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Vijayawada', 
        'Coimbatore', 'Kochi', 'Mangalore', 'Udaipur', 'Jodhpur', 'Dehradun',
        'Ranchi', 'Chandigarh', 'Shimla', 'Gangtok', 'Imphal', 'Aizawl', 
        'Shillong', 'Itanagar', 'Agartala', 'Dimapur', 'Silchar'];

    // Populate the city select dropdown with static city list
    function populateCityList() {
        citySelect.innerHTML = '<option value="">Select a city</option>';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // Fetch weather information
    async function fetchWeather(city) {
        if (city) {
            loader.classList.remove('d-none');
            weatherInfo.innerHTML = '';
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data: ' + response.statusText);
                }
                const data = await response.json();
                
                if (data.cod === 200) {
                    weatherInfo.innerHTML = `
                    <h2>Weather in ${data.name}</h2>
                    <br>
                    <div class="weather-item">
                        <strong>Temperature:</strong> ${data.main.temp} °C &nbsp <i class="fas fa-thermometer-half"></i>
                    </div><br>
                    <div class="weather-item">
                        <strong>Weather:</strong> ${data.weather[0].description} &nbsp <i class="fas fa-cloud-sun"></i>
                    </div><br>
                    <div class="weather-item">
                        <strong>Humidity:</strong> ${data.main.humidity}% &nbsp <i class="fas fa-tachometer-alt"></i>
                    </div><br>
                    <div class="weather-item">
                        <strong>Wind Speed:</strong> ${data.wind.speed} m/s &nbsp <i class="fas fa-wind"></i>
                    </div>
                    `;
                } else {
                    weatherInfo.innerHTML = `<p class="text-danger">Error: ${data.message}</p>`;
                }
            } catch (error) {
                weatherInfo.innerHTML = `<p class="text-danger">Error: Unable to fetch data.</p>`;
                console.error('Error fetching weather data:', error);
            } finally {
                loader.classList.add('d-none');
            }
        } else {
            weatherInfo.innerHTML = '';
        }
    }

    // Populate the city list and setup event listener
    populateCityList();

    citySelect.addEventListener('change', () => {
        const city = citySelect.value;
        fetchWeather(city);
    });
});
