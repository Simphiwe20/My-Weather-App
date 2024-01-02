const dayContainer = document.getElementById("day-container")
const dayWeather = document.getElementById("day-weather")
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=dannhauser&appid=16212962d68b17d5bf5b07f46ed2a77f&units=metric`

async function renderDaysWeather() {
    const promise = await fetch(weatherURL)
    const results = await promise.json()
    console.log(results)
}


