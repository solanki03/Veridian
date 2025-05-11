import { OPENWEATHER_API_KEY } from "./config.js";

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
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data || !data.name || !data.main?.temp) {
            throw new Error("Incomplete weather data.");
        }

        const locationElement = document.getElementById("location");
        const temperatureElement = document.getElementById("temperature");

        if (locationElement) {
            locationElement.textContent = `${data.name}, ${data.sys?.country || ""}`;
        }

        if (temperatureElement) {
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        }

    } catch (error) {
        console.error("Weather fetch failed:", error);
    }
}

// Fallback: New Delhi
async function fetchDefaultWeather() {
    const defaultLat = 28.6139;
    const defaultLon = 77.2090;
    await fetchAndDisplayWeather(defaultLat, defaultLon);
}

fetchWeatherData();
