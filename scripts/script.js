const quote = document.getElementById("quote")
const name = document.getElementById("name")
const date = document.querySelector("#date")
const searchInput = document.querySelector(".search-input")
const searchIcon = document.querySelector('.search-icon')
const searchForm = document.getElementById("searchForm")
const todayNav = document.querySelector("#today-nav")
const tmrNav = document.querySelector("#tmr-nav")
const template = document.getElementById("template")
const todayTemplate = document.getElementById("today")
const nextDaysTemplate = document.getElementById("next-days")
const daysNav = document.querySelector("#days-nav")
const backArrow = document.querySelector("#arrow")
const rightPart = document.querySelector("#right-part")
const timeForecast = document.querySelector(".time-forecast")
const tmrwForecats = document.getElementById("time-forecast")
const errorMsg = document.getElementById("errorMsg")
const quoteAPI = "https://zenquotes.io/api/quotes"
const corsURL = "https://cors-anywhere.herokuapp.com/"


let position = localStorage.position ? JSON.parse(localStorage.position) : {}

console.log(position)
navigator.geolocation.watchPosition(pos => {
    
    position["lat"] = pos.coords.latitude
    position["lon"] = pos.coords.longitude
    localStorage.setItem("position", JSON.stringify(position))
})


const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=c0828550cd7ffd978efced6bb3616a63&units=metric`
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?city=dannhauser&appid=c0828550cd7ffd978efced6bb3616a63&units=metric"

let wrapper = document.createElement("div")
let tmrWrapper = document.createElement("section")

let wordOfTheDay = localStorage.wordOfTheDay ? parse.JSON(localStorage.wordOfTheDay) : {}
let day;
let currentdate = new Date().getDate()
let month;

// Fecthing data using await from Open weather
let weatherPromise = await fetch(weatherAPI)
let weatherData = await weatherPromise.json()
console.log(weatherData)

let todayClone = todayTemplate.content.cloneNode(true)
let weatherList = weatherData.list

// Quote variable to be stored in a local storage
let words = {}
let quotes = localStorage.quotes ? JSON.parse(localStorage.quotes) : {}

const showQuote = (_quote, _name) => {
    quote.innerHTML = _quote
    name.innerHTML = _name
};

// Fecting motivational words from the zen API
fetch(`${corsURL}${quoteAPI}`)
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

// today navigation 
todayNav.addEventListener("click", eve => {
    getToday()
})


// Navigate the time weather

const navTime = () => {
    console.log('Testing the onclick event')

    // document.getElementById("city").innerHTML = weatherData.city.name + ", " + weatherData.city.country
    // let data = JSON.parse(_data)

}

const getToday = () => {
    let todayClone = todayTemplate.content.cloneNode(true)

    let weatherList = weatherData.list
    timeForecast.innerHTML = ""
    weatherList.forEach((list, indx) => {
        let weatherDate = list.dt_txt.split(" ")
        let dateNum = weatherDate[0].split("-")[2]

        if (dateNum == currentdate) {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`

            if (indx == 0) {

                document.getElementById("city").innerHTML = weatherData.city.name + ", " + weatherData.city.country
                todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + weatherList[indx].weather[0].icon + ".png"
                todayClone.getElementById("todayDescription").innerHTML = weatherList[indx].weather[0].description
                todayClone.getElementById("todayFeel").innerHTML += Math.floor(weatherList[indx].main.feels_like) + "\u00B0"
                todayClone.getElementById("todayTemp").innerHTML = Math.floor(weatherList[indx].main.temp) + "\u00B0"
                todayClone.getElementById("todayRateHum").innerHTML = weatherList[indx].main.humidity + "%"
                todayClone.getElementById("todayRateVis").innerHTML = Math.floor(weatherList[indx].visibility / 1000) + "km"
                todayClone.getElementById("todayRateWind").innerHTML = Math.floor(weatherList[indx].wind.speed) + "m/s"

            }
            timeForecast.innerHTML += `<div id="navTime_${indx}" class="times-container flex gap-4">
                                        <div class="time flex center-center column-dir">
                                            <p id="times_${indx}" class="center-text">${dateTime}</p>
                                            <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="">
                                            <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
                                        </div>
                                    </div>`

            document.getElementById(`navTime_${indx}`).addEventListener("click", eve => {
                navTime()
            })

        }

    })
    wrapper.innerHTML = ""
    wrapper.appendChild(todayClone)
    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(wrapper)
}

getToday()

searchIcon.addEventListener("click", eve => {
    if(searchInput.style.display == "none") {
        searchInput.style.display = "block"
    }else {
        showResult()
        searchInput.style.display = "none"
        searchForm.reset()
    }

})

// Adding an event listener to a form
searchForm.addEventListener("submit", eve => {
    eve.preventDefault()

    showResult()

    searchForm.reset()
})

// Show search result in the app
const showResult = () => {
    if (searchInput.style.display == "block") {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=c0828550cd7ffd978efced6bb3616a63&units=metric`)
            .then(prms => prms.json())
            .then(searchData => {
                console.log(searchData)
                let todayClone = todayTemplate.content.cloneNode(true)

                let weatherList = searchData.list
                timeForecast.innerHTML = ""
                weatherList.map((weather, indx) => {
                    let weatherDate = weather.dt_txt.split(" ")
                    let dateNum = weatherDate[0].split("-")[2]
                    console.log(dateNum)

                    // if (dateNum == currentdate) {
                    let timeHour = weatherDate[1].split(":")[0]
                    let timeMinute = weatherDate[1].split(":")[1]
                    let dateTime = `${timeHour}:${timeMinute}`
                    console.log(dateNum)

                    if (indx == 0) {

                        document.getElementById("city").innerHTML = searchData.city.name + ", " + searchData.city.country

                        todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + weatherList[indx].weather[0].icon + ".png"
                        todayClone.getElementById("todayDescription").innerHTML = weatherList[indx].weather[0].description
                        todayClone.getElementById("todayFeel").innerHTML += Math.floor(weatherList[indx].main.feels_like) + "\u00B0"
                        todayClone.getElementById("todayTemp").innerHTML = Math.floor(weatherList[indx].main.temp) + "\u00B0"
                        todayClone.getElementById("todayRateHum").innerHTML = weatherList[indx].main.humidity + "%"
                        todayClone.getElementById("todayRateVis").innerHTML = (weatherList[indx].visibility / 1000) + "km"
                        todayClone.getElementById("todayRateWind").innerHTML = Math.floor(weatherList[indx].wind.speed) + "m/s"

                    }
                    if (dateNum == currentdate) {
                        timeForecast.innerHTML += `<div class="times-container flex gap-4">
                                        <div class="time flex center-center column-dir">
                                            <p id="times_${indx}" class="center-text">${dateTime}</p>
                                            <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="">
                                            <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
                                        </div>
                                    </div>`
                    }


                }

                )
                wrapper.innerHTML = ""
                wrapper.appendChild(todayClone)
                document.getElementById('middle-part').innerHTML = ""
                document.getElementById('middle-part').appendChild(wrapper)
            })

            .catch(err => {
                console.log(err)
                alert("You did not enter a City or you entered an invalid City name");
            })
    }
}


// Search city
searchForm.addEventListener("click", eve => {
    eve.preventDefault()
})

let weather = localStorage.weather ? JSON.parse(localStorage.weather) : []

const sortTime = () => {
    timeForecast.innerHTML = ""
    let weatherList = weatherData.list

    weatherList.forEach((list, indx) => {
        let weatherDate = list.dt_txt.split(" ")
        let dateNum = weatherDate[0].split("-")[2]
        if (dateNum == "01") {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`
            weather.push(
                { data: list }
            )
            localStorage.setItem("weather", JSON.stringify(weather))

            console.log(indx)
            console.log(list)
            timeForecast.innerHTML += ` <div id="navTime_${indx}" class="times-container flex gap-4">
                                            <div class="time flex center-center column-dir">
                                                <p id="times_${indx}" class="center-text">${dateTime}</p>
                                                <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="${dateTime}'s weather condition>
                                                <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
                                            </div>
                                        </div>`

            document.getElementById(`navTime_${indx}`).addEventListener("click", eve => {
                navTime()
            })

        }

        if (dateNum == currentdate + 1) {
            let timeHour = weatherDate[1].split(":")[0]
            let timeMinute = weatherDate[1].split(":")[1]
            let dateTime = `${timeHour}:${timeMinute}`
            weather.push(
                { data: list }
            )
            localStorage.setItem("weather", JSON.stringify(weather))

            timeForecast.innerHTML += ` <div onclick="navTime()" id="navTime_${indx}" class="times-container flex gap-4">
                                            <div class="time flex center-center column-dir">
                                                <p id="times_${indx}" class="center-text">${dateTime}</p>
                                                <img class="time-icon" id="time-icon_${indx}" class="center-text" src="http://openweathermap.org/img/w/${weatherList[indx].weather[0].icon}.png" alt ="${dateTime}'s weather condition>
                                                <p class="time-deg_${indx}" class="center-text">${Math.floor(weatherList[indx].main.temp)} \u00B0</p>
                                            </div>
                                        </div>`

            console.log(indx + " " + dateTime)
            timeNav(`navTime_${indx}`)
        }

    })
    renderTmr()
    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(wrapper)
    console.log(wrapper)
}

const renderTmr = () => {
    let todayClone = todayTemplate.content.cloneNode(true)

    weather.forEach((tmrWeather, indx) => {
        if (indx === 0) {
            console.log(tmrWeather)
            document.getElementById("city").innerHTML = weatherData.city.name + ", " + weatherData.city.country

            todayClone.getElementById("todayIcon").src = "http://openweathermap.org/img/w/" + tmrWeather.data.weather[0].icon + ".png"
            todayClone.getElementById("todayDescription").innerHTML = tmrWeather.data.weather[0].description
            todayClone.getElementById("todayFeel").innerHTML += Math.floor(tmrWeather.data.main.feels_like) + "\u00B0"
            todayClone.getElementById("todayTemp").innerHTML = Math.floor(tmrWeather.data.main.temp) + "\u00B0"
            todayClone.getElementById("todayRateHum").innerHTML = tmrWeather.data.main.humidity + "%"
            todayClone.getElementById("todayRateVis").innerHTML = (tmrWeather.data.visibility / 1000) + "km"
            todayClone.getElementById("todayRateWind").innerHTML = Math.floor(tmrWeather.data.wind.speed) + "m/s"

            // timeForecast.innerHTML = ""
        }
    })
    wrapper.innerHTML = ""
    wrapper.appendChild(todayClone)
}

const timeNav = (id) => {
    document.getElementById(id).addEventListener("click", _eve => {
        navTime()
    })
}

// Tommorow's Day navigation
tmrNav.addEventListener("click", eve => {
    sortTime()

})


const setDay = () => {
    let currentDay = new Date().getDay()
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

