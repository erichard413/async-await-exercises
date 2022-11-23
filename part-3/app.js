let pokeBtn = document.getElementById("pokeBtn")
let allPokeURL = "https://pokeapi.co/api/v2/pokemon?limit=1000"
let getPokeURL = "https://pokeapi.co/api/v2/pokemon/"
let pokemonResults = document.getElementById("pokemon")


pokeBtn.addEventListener("click", function(e) {
    e.preventDefault()
        getPokemonAsync()
    }
)

function makeUI(pokemons) {
    for (poke of pokemons) {
        let pokeDiv = document.createElement("div")
        pokeDiv.classList.add("pokeDiv")
        let pokeName = document.createElement("p")
        pokeName.classList.add("pokeName")
        pokeName.innerText = poke.name
        let pokeSprite = document.createElement("img")
        pokeSprite.src = poke.imgsrc
        pokeDiv.append(pokeName)
        pokeDiv.append(pokeSprite)
        let pokeText = document.createElement("p")
        pokeText.innerText = poke.description
        pokeDiv.append(pokeText)
        pokemonResults.append(pokeDiv)
    }
    
}

async function getPokemonAsync() {
    let pokeURLs = []
    let namesAndImages = [];
    let allPoke = await axios.get(`${allPokeURL}`)
    for (i = 0; i<3; i++){
        let pokeIdx = Math.floor(Math.random() * allPoke.data.results.length)
        let url = allPoke.data.results.splice(pokeIdx, 1)[0].url;
        pokeURLs.push(url)
    }
    let p1 = await axios.get(`${pokeURLs[0]}`)
    let p2 = await axios.get(`${pokeURLs[1]}`)
    let p3 = await axios.get(`${pokeURLs[2]}`)
    let p1data = await axios.get(`${p1.data.species.url}`)
    let p2data = await axios.get(`${p2.data.species.url}`)
    let p3data = await axios.get(`${p3.data.species.url}`)
    let pokeData = [p1data, p2data, p3data]
    let pokeText = []
    for(let each of pokeData) {
        let engText = each.data.flavor_text_entries.find(function(entry) {
            return entry.language.name === "en";
        });
        pokeText.push(engText)
    }
    let pokeDetails = [p1.data, p2.data, p3.data]
    for (let i = 0; i<3; i++) {
        namesAndImages.push({name: pokeDetails[i].name, imgsrc: pokeDetails[i].sprites.front_default, description: pokeText[i].flavor_text})
    }
    makeUI(namesAndImages)
}






