// Function to get coordinates from country name using OpenStreetMap Nominatim API
async function getCoordinates(countryName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(countryName)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return {
                longitude: parseFloat(data[0].lon),
                latitude: parseFloat(data[0].lat)
            };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error getting coordinates:', error);
        throw error;
    }
}

// Function to get weather information from coordinates using OpenWeatherMap API
async function getWeather(latitude, longitude) {
    const apiKey = '81ea132308e725a4ce8527a6c741db32';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            weather: data.weather[0].description,
            temperature: data.main.temp
        };
    } catch (error) {
        console.error('Error getting weather:', error);
        throw error;
    }
}

// Function to get coordinates and weather
async function getCountryWeather(countryName) {
    try {
        const coordinates = await getCoordinates(countryName);
        const weather = await getWeather(coordinates.latitude, coordinates.longitude);
        console.log(`Weather in ${countryName}: ${weather.weather}. Temperature: ${weather.temperature} Kelvin`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
getCountryWeather('United States');
