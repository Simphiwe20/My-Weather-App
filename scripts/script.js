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
const quoteAPI = "https://zenquotes.io/api/quotes"
const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=-26.2041028&lon=28.0473051&appid={}"

let wordOfTheDay = localStorage.wordOfTheDay ? parse.JSON(localStorage.wordOfTheDay) : {}
let day;
let currentdate = new Date().getDate()
let month;

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

// Fecthing the data from the Open weather API



// Showing the search input 
searchIcon.addEventListener("click", eve => {
    searchInput.style.display == "none" ? searchInput.style.display = "block" : searchInput.style.display = "none"
})


// Get to the home page
// const toHomePage = () => {
//     rightPart.innerHTML = ""
//     rightPart.innerHTML = 
// }

// today navigation 
todayNav.addEventListener("click", eve => {
    getToday()
})

const getToday = () => {
    let clone = todayTemplate.content.cloneNode(true)


    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(clone) 
}

// Tommorow's Day navigation
tmrNav.addEventListener("click", eve => {
    let clone = template.content.cloneNode(true)

    clone.querySelector("#temp").textContent = '30&deg'
    
    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(clone) 
})

// Next days navigation 
daysNav.addEventListener("click", eve => {
    // let clone = nextDaysTemplate.content.cloneNode(true)

    document.querySelector(".right-part").innerHTML =""
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

// Adding an event listener to a backward arrow
// backArrow.addEventListener('click', eve => {
//     getToday()
// })

getToday()
// const date = new Date().getSeconds()
// console.log(date)

// adding today's template


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


console.log(day)
console.log(month)