let numInput = document.querySelector('#favNum')
let btn = document.querySelector('#button')
let results = document.querySelector('.results')
let resDiv = document.querySelector('.res-div')
let factsArr = []

async function getFacts(url) {
    for (let i = 0; i<4; i++){
        let facts = await axios.get(url)
        let input = numInput.value
    if (input.includes(",")) {
        for (let each in facts.data) {
            factsArr.push(facts.data[each])
            let newLi = document.createElement('li')
            newLi.innerText = facts.data[each]
            results.append(newLi)
        }
    } else {
        factsArr.push(facts.data.text)
        let newLi = document.createElement('li')
        newLi.innerText = facts.data.text
        results.append(newLi)
    } 
    }
}

btn.addEventListener("click", function(e) {
    e.preventDefault()
    let favNum = numInput.value
    let baseURL = `http://numbersapi.com/${favNum}?json`
    getFacts(baseURL)   
})



