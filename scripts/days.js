const dayContainer = document.querySelector(".days-container")
const dayWeather = document.getElementById("day-weather")
const days = document.getElementById("days")
const timeForecast = document.getElementById("timeForecast")
const daysNav = document.querySelector("#days-nav")
const todayTemplate = document.getElementById("today")

let wrapper = document.createElement("div")

let position = localStorage.position ? JSON.parse(localStorage.position) : {}

console.log(position)
navigator.geolocation.watchPosition(pos => {

    position["lat"] = pos.coords.latitude
    position["lon"] = pos.coords.longitude
    localStorage.setItem("position", JSON.stringify(position))
})


const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=c0828550cd7ffd978efced6bb3616a63&units=metric`

const promise = await fetch(weatherURL)
const results = await promise.json()
console.log(results)
let currentdate = new Date().getDate()

let weatherList = results.list

let daysWeather = localStorage.daysWeather ? JSON.parse(localStorage.daysWeather) : { "twoDaysAhead": [], "threeDaysAhead": [], "fourDaysAhead": [] }
let twoDaysAhead = []
let threeDaysAhead = []
let fourDaysAhead = []


weatherList.forEach((list, indx) => {
    let weatherDate = list.dt_txt.split(" ")
    let dateNum = weatherDate[0].split("-")[2]

    if (dateNum == currentdate + 2) {
        let timeHour = weatherDate[1].split(":")[0]
        let timeMinute = weatherDate[1].split(":")[1]
        let dateTime = `${timeHour}:${timeMinute}`
        twoDaysAhead.push(list)

    } if (dateNum == currentdate + 3) {
        let timeHour = weatherDate[1].split(":")[0]
        let timeMinute = weatherDate[1].split(":")[1]
        let dateTime = `${timeHour}:${timeMinute}`
        threeDaysAhead.push(list)

    } if (dateNum == currentdate + 4) {
        let timeHour = weatherDate[1].split(":")[0]
        let timeMinute = weatherDate[1].split(":")[1]
        let dateTime = `${timeHour}:${timeMinute}`
        fourDaysAhead.push(list)

    }

})

daysWeather["twoDaysAhead"] = twoDaysAhead
daysWeather["threeDaysAhead"] = threeDaysAhead
daysWeather["fourDaysAhead"] = fourDaysAhead

let day;

localStorage.setItem("daysWeather", JSON.stringify(daysWeather))

const getTwoDaysAheadWeather = () => {
    let todayClone = todayTemplate.content.cloneNode(true)
    getDay(twoDaysAhead)
    daysWeather["twoDaysAhead"].forEach((data, indx) => {
        let weatherDate = data.dt_txt.split(" ")
        let dateNum = weatherDate[0].split("-")[2]
        if (dateNum == currentdate + 2) {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`

            if (indx == 4) {
                timeForecast.innerHTML = `<div class="day flex center-center column-dir" id="twoDaysAhead">
                                        <img class="time-icon center-text" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                                        <p id="time-icon" class="center-text">${dateNum}</p>
                                        <p id="time-deg" class="center-text">${day}</p>
                                    </div>`
                
                wrapper.innerHTML = ""
                
                todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
                todayClone.getElementById("todayDescription").innerHTML = data.weather[0].description
                todayClone.getElementById("todayFeel").innerHTML += Math.floor(data.main.feels_like) + "\u00B0"
                todayClone.getElementById("todayTemp").innerHTML = Math.floor(data.main.temp) + "\u00B0"
                todayClone.getElementById("todayRateHum").innerHTML = data.main.humidity + "%"
                todayClone.getElementById("todayRateVis").innerHTML = Math.floor(data.visibility / 1000) + "km"
                todayClone.getElementById("todayRateWind").innerHTML = Math.floor(data.wind.speed) + "m/s"

                wrapper.appendChild(todayClone)
                document.getElementById('middle-part').innerHTML = ""
                document.getElementById('middle-part').appendChild(wrapper)
            }


        }
    })
}

const getThreeDaysAheadWeather = () => {
    getDay(threeDaysAhead)
    daysWeather["threeDaysAhead"].forEach((data, indx) => {
        let weatherDate = data.dt_txt.split(" ")
        let dateNum = weatherDate[0].split("-")[2]
        if (dateNum == currentdate + 3) {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`

            if (indx == 4) {
                timeForecast.innerHTML += `<div class="day flex center-center column-dir" id="threeDaysAhead">
                                        <img class="time-icon center-text" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                                        <p id="time-icon" class="center-text">${dateNum}</p>
                                        <p id="time-deg" class="center-text">${day}</p>
                                    </div>`
            }


        }
    })
}


const getFourDaysAheadWeather = () => {
    getDay(fourDaysAhead)
    daysWeather["fourDaysAhead"].forEach((data, indx) => {
        let weatherDate = data.dt_txt.split(" ")
        let dateNum = weatherDate[0].split("-")[2]
        if (dateNum == currentdate + 4) {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`

            if (indx == 4) {
                timeForecast.innerHTML += `<div onclick="weather(${0})" class="day flex center-center column-dir" id="_fourDaysAhead">
                                        <img class="time-icon center-text" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                                        <p id="time-icon" class="center-text">${dateNum}</p>
                                        <p id="time-deg" class="center-text">${day}</p>
                                    </div>`
            }


        }
    })
}

daysNav.addEventListener("click", ev => {
    getTwoDaysAheadWeather()
    getThreeDaysAheadWeather()
    getFourDaysAheadWeather()

})

const getDay = (_day) => {
    let weatherDate = _day[0].dt_txt.split(" ")
    let Day = new Date(weatherDate[0]).getDay()
    switch (Day) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon"
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thur"
            break;
        case 5:
            day = "Fri"
            break;
        case 6:
            day = "Sar";
            break;
    }
    console.log(day)
}