let deckId
let newDeckURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
let gimmeCardBtn = document.getElementById('getCard')
let cardsDiv = document.getElementById('cards')
let drawCardURL

async function drawCard() {
    let res = await axios.get(`${drawCardURL}`)
        if (res.data.remaining == 0) {
            gimmeCardBtn.remove()
        }
        let cardimg = document.createElement("img")
        cardimg.src = `${res.data.cards[0].image}`
        let angle = Math.random() * 90 - 45;
        let randomY = Math.random() * 40 - 20;
        let randomX = Math.random() * 40 - 20;
        cardimg.style.transform= `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        cardsDiv.append(cardimg)
    } 

gimmeCardBtn.addEventListener("click", function(e){
    e.preventDefault()
    drawCard()
})




window.onload = function(){ 
    axios.get(`${newDeckURL}`)
    .then(res => {
        deckId = res.data.deck_id
        drawCardURL = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    })
    .catch(err => {
        console.log(err)
    }) 
}





