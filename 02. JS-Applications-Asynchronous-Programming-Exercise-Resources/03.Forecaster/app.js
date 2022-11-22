function attachEvents() {
    const button = document.getElementById("submit")
    const current = document.getElementById("current")
    const upcoming = document.getElementById("upcoming")
    const symbols = {
        "Sunny": '\u2600',
        "Partly sunny": '\u26c5',
        "Overcast": '\u2601',
        "Rain": '\u2602',
        "Degrees": '\u00b0'
    }

    button.addEventListener("click", onClick)

    async function onClick(){
    let code = await getId()
    try{
    await currentConditions(code)
    await upcomingConditions(code)
    }
    catch(err){
        let div4e = htmlGen("div", "Error", "label")
        upcoming.replaceChildren(div4e)
        let div4e2 = htmlGen("div", "Error", "label")
        current.replaceChildren(div4e2)
        document.getElementById("forecast").style.display = "block"
    }
    }   
    async function getId(){
        let location = document.getElementById("location").value
        let response = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
        let data = await response.json()
        let id = ""
        data.forEach(element => {
            if(element.name == location){
                id = element.code
            }
        });
        document.getElementById("location").value = ""
        return id
    }
    async function currentConditions(code){
        let res = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
        if(!res.ok){throw new Error()}
        let d = await res.json()
        let div4e = htmlGen("div", "Current conditions", "label")
        current.replaceChildren(div4e)
        let forecastDiv = htmlGen("div", undefined, "forecasts")
        let symboSpan = htmlGen("span", symbols[d.forecast.condition], "condition symbol")
        let conditionSpan = htmlGen("span",undefined,"condition")
        let dataSpan1 = htmlGen("span", d.name, "forecast-data")
        let dataSpan2 = htmlGen("span", `${d.forecast.low}${symbols.Degrees}/${d.forecast.high}${symbols.Degrees}`, "forecast-data")
        let dataSpan3 = htmlGen("span", d.forecast.condition, "forecast-data")
        document.getElementById("forecast").style.display = "block"
        forecastDiv.appendChild(symboSpan)
        forecastDiv.appendChild(conditionSpan)
        conditionSpan.appendChild(dataSpan1)
        conditionSpan.appendChild(dataSpan2)
        conditionSpan.appendChild(dataSpan3)
        current.appendChild(forecastDiv)
    }
    async function upcomingConditions(code){
        let res = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
        if(!res.ok){throw new Error()}
        let d = await res.json()
        let div4e = htmlGen("div", "Three-day forecast", "label")
        upcoming.replaceChildren(div4e)
        let forecastDiv = htmlGen("div", undefined, "forecast-info")
        d.forecast.forEach(element =>{
            let upcomingSpan = htmlGen("span", undefined, "upcoming")
            let symbolSpan = htmlGen("span",symbols[element.condition],"symbol")
            let dataSpan1 = htmlGen("span", `${element.low}${symbols.Degrees}/${element.high}${symbols.Degrees}`, "forecast-data")
            let dataSpan2 = htmlGen("span", element.condition, "forecast-data")
            upcomingSpan.appendChild(symbolSpan)
            upcomingSpan.appendChild(dataSpan1)
            upcomingSpan.appendChild(dataSpan2)
            forecastDiv.appendChild(upcomingSpan)
        })
        upcoming.appendChild(forecastDiv)
    }
    function htmlGen(name,text,classname){
        let el = document.createElement(name)
        el.textContent = text
        if(classname){
            el.className = classname
        }
        return el
    }
}

attachEvents();