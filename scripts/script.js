const quote = document.getElementById("quote")
const name = document.getElementById("name")
const quoteAPI = "https://zenquotes.io/api/quotes"
const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=-26.2041028&lon=28.0473051&appid=c7c25be4be940b668a7ff7adeba7f5f1"



fetch(quoteAPI)
    .then(promise => promise.json())
    .then(quotes => {
        console.log(quotes)
        let _word = ""
        let figure = ""
        setInterval(quotes.forEach(word => {
            _word = word.q
            figure = word.a
        }))
        showQuote(_word, figure)
        
    })
    
    

    .catch(err => console(err))


const showQuote = (_quote, _name) => {
    quote.innerHTML = _quote
    name.innerHTML = _name
};

console.log("Whats Up")