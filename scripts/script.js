const quote = document.getElementById("quote")
const name = document.getElementById("name")
const date = document.querySelector("#date")
const searchInput = document.querySelector(".search-input")
const searchIcon = document.querySelector('.search-icon')
const todayNav = document.querySelector("#today-nav")
const tmrNav = document.querySelector("#tmr-nav")
const template = document.getElementById("template")
const todayTemplate = document.getElementById("today")
const quoteAPI = "https://zenquotes.io/api/quotes"
const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=-26.2041028&lon=28.0473051&appid=c7c25be4be940b668a7ff7adeba7f5f1"

let wordOfTheDay = localStorage.wordOfTheDay ? parse.JSON(localStorage.wordOfTheDay) : {}
let day;
let currentdate = new Date().getDate()
let month;


console.log(template)

// Showing the search input 
searchIcon.addEventListener("click", eve => {
    searchInput.style.display == "none" ? searchInput.style.display = "block" : searchInput.style.display = "none"
})



// today navigation 
todayNav.addEventListener("click", eve => {
    getToday()
})

const getToday = () => {
    let clone = todayTemplate.content.cloneNode(true)


    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(clone) 
}

// Day navigation
tmrNav.addEventListener("click", eve => {
    let clone = template.content.cloneNode(true)

    clone.querySelector("#temp").textContent = '30&deg'
    
    document.getElementById('middle-part').innerHTML = ""
    document.getElementById('middle-part').appendChild(clone) 
})


getToday()
// const date = new Date().getSeconds()
// console.log(date)

// adding today's template





// Generating a word of the day
fetch(quoteAPI)
    .then(promise => promise.json())
    .then(quotes => {
        let _word = quotes[0].q
        let figure = quotes[0].a
        console.log(quotes)
        quotes.forEach(word => {
                setInterval(_word = word.a, figure = word.q,  )

        })
        showQuote(_word, figure)

    })
    .catch(err => console.log(err))


const showQuote = (_quote, _name) => {
    quote.innerHTML = _quote
    name.innerHTML = _name
};


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