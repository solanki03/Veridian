// Fetch weather data using wttr.in and location name from OpenStreetMap

// fetching latitude and longitude using geolocation
async function fetchWeatherData() {
    if (!navigator.geolocation) {
        console.error("Geolocation not supported. Loading default location.");
        fetchDefaultWeather();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            await fetchAndDisplayWeather(lat, lon);
        },
        async (error) => {
            console.warn("Geolocation denied. Using default location (New Delhi).", error);
            fetchDefaultWeather();
        }
    );
}

// function to fetch and update UI
async function fetchAndDisplayWeather(lat, lon) {
    try {
         // Fetch temperature from wttr.in
        const url = `https://wttr.in/${lat},${lon}?format=j1`;
        const tempRes = await fetch(url);
        const data = await tempRes.json();

        const temperature = data?.current_condition?.[0]?.temp_C + "°C";

        // Fetch location name from OpenStreetMap
        const location = await reverseGeocode(lat, lon);
        
        const locationElement = document.getElementById("location");
        const temperatureElement = document.getElementById("temperature");

        if (locationElement) locationElement.textContent = location;
        if (temperatureElement) temperatureElement.textContent = temperature;

    } catch (error) {
        console.error("Weather fetch failed:", error);
    }
}

// Fetch human-readable location name
async function reverseGeocode(lat, lon) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'VeridianWeatherApp/1.0 '
            }
        });
        const data = await res.json();

        return (
            data.address.city ||
            data.address.state ||
            data.display_name ||
            "Unknown Location"
        );
    } catch (err) {
        console.warn("Reverse geocoding failed:", err);
        return "Unknown Location";
    }
}

// Fallback: New Delhi
async function fetchDefaultWeather() {
    const defaultLat = 28.6139;
    const defaultLon = 77.2090;
    await fetchAndDisplayWeather(defaultLat, defaultLon);
}

fetchWeatherData();
