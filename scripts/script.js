const quote = document.getElementById("quote")
const name = document.getElementById("name")
const date = document.querySelector("#date")
const searchInput = document.querySelector(".search-input")
const searchIcon = document.querySelector('.search-icon')
const todayNav = document.querySelector("#today-nav")
const tmrNav = document.querySelector("#tmr-nav")
const template = document.getElementById("template")
const todayTemplate = document.getElementById("today")
const nextDaysTemplate = document.getElementById("next-days")
const daysNav = document.querySelector("#days-nav")
const backArrow = document.querySelector("#arrow")
const rightPart = document.querySelector("#right-part")
const timeForecast = document.querySelector(".time-forecast")
const quoteAPI = "https://zenquotes.io/api/quotes"

// let lon;
// let lat;

let position = localStorage.position ? JSON.parse(localStorage.position) : {}

let pos = navigator.geolocation.getCurrentPosition(pos => {
    position["lat"] = pos.coords.latitude
    position["lon"] = pos.coords.longitude
    localStorage.setItem("position", JSON.stringify(position))    
})


const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=&units=metric`
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?city=dannhauser&appid=&units=metric"

let wrapper = document.createElement("div")

let wordOfTheDay = localStorage.wordOfTheDay ? parse.JSON(localStorage.wordOfTheDay) : {}
let day;
let currentdate = new Date().getDate()
console.log(currentdate)
let month;

// Fecthing data using await from Open weather
let weatherPromise = await fetch(weatherAPI)
let weatherData = await weatherPromise.json()
console.log(weatherData)

var todayClone = todayTemplate.content.cloneNode(true)

// Accessing the weather data list using it's date to view it
let weatherList = weatherData.list
weatherList.forEach((list, indx) => {
    let weatherDate = list.dt_txt.split(" ")
    let dateNum = weatherDate[0].split("-")[2]
    console.log(dateNum)

    if (dateNum == currentdate) {
        let timeHour = weatherDate[1].split(":")[0]
        let timeMinute = weatherDate[1].split(":")[1]
        let dateTime = `${timeHour}:${timeMinute}`
        console.log(dateNum)

        if (indx == 0) {

            document.getElementById("city").innerHTML = weatherData.city.name + ", " + weatherData.city.country

            todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + weatherList[indx].weather[0].icon + ".png"
            todayClone.getElementById("todayDescription").innerHTML = weatherList[indx].weather[0].description
            todayClone.getElementById("todayFeel").innerHTML += Math.floor(weatherList[indx].main.feels_like) + "\u00B0"
            todayClone.getElementById("todayTemp").innerHTML = Math.floor(weatherList[indx].main.temp) + "\u00B0"
            todayClone.getElementById("todayRateHum").innerHTML = weatherList[indx].main.humidity + "%"
            todayClone.getElementById("todayRateVis").innerHTML = (weatherList[indx].visibility / 1000) + "km"
            todayClone.getElementById("todayRateWind").innerHTML = Math.floor(weatherList[indx].wind.speed) + "m/s"

        }
        wrapper.appendChild(todayClone)
        timeForecast.innerHTML += `<div class="times-container flex gap-4">
                                        <div class="time flex center-center column-dir">
                                            <p id="times_${indx}" class="center-text">${dateTime}</p>
                                            <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="">
                                            <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
                                        </div>
                                    </div>`

    }

})


// Quote variable to be stored in a local storage
let words = {}
let quotes = localStorage.quotes ? JSON.parse(localStorage.quotes) : {}

const showQuote = (_quote, _name) => {
    quote.innerHTML = _quote
    name.innerHTML = _name
};

// Fecting motivational words from the zen API
fetch(quoteAPI)
    .then(promise => promise.json())
    .then(quote => {
        console.log(quote)
        let count = 1
        let word = quote[0].q
        let person = quote[0].a
        showQuote(word, person)
        setInterval(() => {
            words["quote"] = quote[count].q
            words["person"] = quote[count].a
            quotes = words
            console.log(quotes)
            localStorage.setItem("quotes", JSON.stringify(quotes))
            count++
            showQuote(quotes["quote"], quotes["person"])

            if (count === 50) count = 0
        }, 30000000)
    })
    .catch(err => console.log(err))


// Showing the search input 
searchIcon.addEventListener("click", eve => {
    searchInput.style.display == "none" ? searchInput.style.display = "block" : searchInput.style.display = "none"
})

// today navigation 
todayNav.addEventListener("click", eve => {
    getToday()
})

const getToday = () => {
    // let weatherList = weatherData.list
    // weatherList.forEach((list, indx) => {
    // let weatherDate = list.dt_txt.split(" ")
    // let dateNum = weatherDate[0].split("-")[2]
    // console.log(dateNum)

    // if (dateNum == currentdate) {
    //     let timeHour = weatherDate[1].split(":")[0]
    //     let timeMinute = weatherDate[1].split(":")[1]
    //     let dateTime = `${timeHour}:${timeMinute}`
    //     console.log(dateNum)

    //     if (indx == 0) {

    //         document.getElementById("city").innerHTML = weatherData.city.name + ", " + weatherData.city.country

    //         todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + weatherList[indx].weather[0].icon + ".png"
    //         todayClone.getElementById("todayDescription").innerHTML = weatherList[indx].weather[0].description
    //         todayClone.getElementById("todayFeel").innerHTML += Math.floor(weatherList[indx].main.feels_like) + "\u00B0"
    //         todayClone.getElementById("todayTemp").innerHTML = Math.floor(weatherList[indx].main.temp) + "\u00B0"
    //         todayClone.getElementById("todayRateHum").innerHTML = weatherList[indx].main.humidity + "%"
    //         todayClone.getElementById("todayRateVis").innerHTML = (weatherList[indx].visibility / 1000) + "km"
    //         todayClone.getElementById("todayRateWind").innerHTML = Math.floor(weatherList[indx].wind.speed) + "m/s"

    //     }
    //     wrapper.appendChild(todayClone)
    //     timeForecast.innerHTML += `<div class="times-container flex gap-4">
    //                                     <div class="time flex center-center column-dir">
    //                                         <p id="times_${indx}" class="center-text">${dateTime}</p>
    //                                         <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="">
    //                                         <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
    //                                     </div>
    //                                 </div>`

    // }

    // })
    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(wrapper)
}

let weather = localStorage.weather ? JSON.parse(localStorage.weather) : []

// Tommorow's Day navigation
tmrNav.addEventListener("click", eve => {
    let weatherList = weatherData.list
    weatherList.forEach((list, indx) => {
        let weatherDate = list.dt_txt.split(" ")
        let dateNum = weatherDate[0].split("-")[2]
        console.log(dateNum)

        if (dateNum == currentdate + 1) {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`
            console.log(list)
            weather.push(list)
            localStorage.setItem("weather", JSON.stringify(weather))
            if (indx == 0) {

                document.getElementById("city").innerHTML = weatherData.city.name + ", " + weatherData.city.country

                todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + weather[0].weather[0].icon + ".png"
                todayClone.getElementById("todayDescription").innerHTML = weather[indx].weather[0].description
                todayClone.getElementById("todayFeel").innerHTML += Math.floor(weather[indx].main.feels_like) + "\u00B0"
                todayClone.getElementById("todayTemp").innerHTML = Math.floor(weather[indx].main.temp) + "\u00B0"
                todayClone.getElementById("todayRateHum").innerHTML = weather[indx].main.humidity + "%"
                todayClone.getElementById("todayRateVis").innerHTML = (weather[indx].visibility / 1000) + "km"
                todayClone.getElementById("todayRateWind").innerHTML = Math.floor(weather[indx].wind.speed) + "m/s"

            }
            wrapper.appendChild(todayClone)
            timeForecast.innerHTML += `<div class="times-container flex gap-4">
                                        <div class="time flex center-center column-dir">
                                            <p id="times_${indx}" class="center-text">${dateTime}</p>
                                            <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="">
                                            <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
                                        </div>
                                    </div>`
        }

    })
    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(wrapper)
})

// Next days navigation 
daysNav.addEventListener("click", eve => {
    // let clone = nextDaysTemplate.content.cloneNode(true)

    document.querySelector(".right-part").innerHTML = ""
    document.querySelector(".right-part").innerHTML = `<div class="middle margin-top-0 days-middle">
    <div class="next-days">
        <div class="days-top flex vert-align gap-12">
            <div class="arrow">
                <a href="#toToday"><span  id="arrow" class="material-symbols-outlined">keyboard_backspace</span></a>
            </div>
            <div class="next-day">
                <p>5 Next Days</p>
            </div>
        </div>
        <div class="day-container flex space-around">
            <div class="day">
                <p id="time" class="center-text">12:00</p>
                <p id="time-icon" class="center-text">icon</p>
                <p id="time-deg" class="center-text">25&deg</p>
            </div>
            <div class="day">
                <p class="center-text">12:00</p>
                <p class="center-text">icon</p>
                <p class="center-text">25&deg</p>
            </div>
            <div class="day">
                <p class="center-text">12:00</p>
                <p class="center-text">icon</p>
                <p class="center-text">25&deg</p>
            </div>
            <div class="day">
                <p class="center-text">12:00</p>
                <p class="center-text">icon</p>
                <p class="center-text">25&deg</p>
            </div>
            <div class="day">
                <p class="center-text">12:00</p>
                <p class="center-text">icon</p>
                <p class="center-text">25&deg</p>
            </div>
        </div>
        <div class="day-weather">
            <div class="days-temp flex space-around vert-align">
                <div class="icon">
                    <p>ICON</p>
                </div>
                <div class="temp-container flex vert-align">
                    <p class="temp margin-0">28&deg</p>
                    <p class="align-item-to-end margin-top-10">C</p>
                </div>
            </div>
        </div>
    </div>
</div>`
})


getToday()


const setDay = () => {
    let currentDay = new Date().getDay()
    console.log(currentDay)
    switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Sartuday";
            break;
    }

}

setDay()


const setDate = () => {
    let currentMonth = new Date().getMonth()
    switch (currentMonth) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February"
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September"
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
}

setDate()

// Putting a date inside html
date.textContent = `${day}, ${currentdate} ${month}`