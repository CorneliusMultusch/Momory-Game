/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck")
let card = document.getElementsByClassName("card")
let cards = ['<i class="fa fa-diamond"></i>','<i class="fa fa-paper-plane-o"></i>','<i class="fa fa-anchor"></i>','<i class="fa fa-bolt"></i>','<i class="fa fa-cube"></i>','<i class="fa fa-leaf"></i>','<i class="fa fa-bicycle"></i>','<i class="fa fa-bomb"></i>','<i class="fa fa-diamond"></i>','<i class="fa fa-paper-plane-o"></i>','<i class="fa fa-anchor"></i>','<i class="fa fa-bolt"></i>','<i class="fa fa-cube"></i>','<i class="fa fa-leaf"></i>','<i class="fa fa-bicycle"></i>','<i class="fa fa-bomb"></i>']

const moveScore = document.querySelector(".moves")

const stars = document.querySelector(".stars").childNodes

const restart = document.querySelector(".restart")

let moves = 0

let compare = []

let done = []

let interval


const secondsT = document.querySelector(".seconds") 
const minutesT = document.querySelector(".minutes") 
const hoursT = document.querySelector(".hours")

let seconds = 0
let minutes = 0
let hours = 0
let t = NaN

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

 
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards)
console.log(cards)
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex

    while (currentIndex !== 0) {1
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue;
    }

    return array
}

function createCard () { 
    
    deck.innerHTML = ""

    cards.map(card => { // card = Icon 
    
    listelement = document.createElement("li")
    
    listelement.innerHTML = card
    listelement.className += "card"
    deck.appendChild(listelement)
    
    listelement.addEventListener('click', clicked)
    
})

}
createCard () 

let timerStart = 0

function clicked(e) {
    let singlecard = e.target
    if (timerStart === 0) {
        countTime()
        timerStart = 1
    }
    if (e.target.className === 'card'){
        singlecard.className += " show open"
        compare.push(singlecard)
        console.log(compare)
        
    }
    
    if (compare.length === 2) {
        countScore()
        console.log("Wohooo")
        deck.classList.add("dont-click")

        if (compare[0].innerHTML === compare[1].innerHTML) {
            matched()
        } else {
            setTimeout(notMatched, 1000)
        }
    finish()
    }

}
function matched() {
    compare[0].className += " match"
    compare[1].className += " match"

    done.push(compare[0])
    done.push(compare[1])

    compare = []

    deck.classList.remove("dont-click")
}
function notMatched() {
    compare[0].className = "card"
    compare[1].className = "card"

    compare = []

    deck.classList.remove("dont-click")
}


function countScore(){    
    moves ++
    if (moves === 1) {
        moveScore.innerHTML = "1 Move"
        
    } else {
        moveScore.innerHTML = moves.valueOf() + " Moves"
    }
    rating()
}
function rating() {
    if (moves === 8 ){
        stars[9].className += "red"
    }
    if (moves === 12 ){
        stars[7].className += "red"
    }
    if (moves === 15 ){
        stars[5].className += "red"
    }
    if (moves === 20 ){
        stars[3].className += "red"
    }
    if (moves === 25 ){
        stars[1].className += "red"
    }
}


function restartGame() {
    moves = 0
    moveScore.innerHTML = "0 Move"
    compare = []
    done = []
    
    stars[1].className = ""
    stars[3].className = ""
    stars[5].className = ""
    stars[7].className = ""
    stars[9].className = ""
    createCard()
    console.log(card)
    shuffle(cards)  
    modal.classList.remove("show-modal")
    seconds = 0
        minutes = 0 
        hours = 0
        timerStart = 0
}

restart.addEventListener("click", restartGame)


function plusNull(x, y) { 
    if (x <= 9) {
        return (y.innerHTML = "0"+x)
    } else {
    return ( y.innerHTML = x)
    }
}

function countTime() {
    
    if ( timerStart === 0){
        if (seconds == 0){
        seconds++
        }
        let interval = setInterval(function(){
        secondsT.innerHTML = seconds
        minutesT.innerHTML = minutes
        hoursT.innerHTML = hours

        plusNull(hours, hoursT)
        plusNull(minutes, minutesT)
        plusNull(seconds, secondsT)

            seconds++
            if (seconds >= 60) {
            seconds = 0 
            minutes++
            if ( minutes >= 60) {
                minutes = 60
                hours++
            }
        }
    },1000)
}
}


function toggleModal() {
    modal.classList.toggle("show-modal")
    
}

modal.onClick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"
}
}
      
function finish() {
    if(done.length === 16) {
        toggleModal()
        console.log("Boom")
        const yourTime = document.querySelector(".yourTime")
        yourTime.innerHTML = hours + ":" + minutes + ":" + seconds
        
        const yourMoves = document.querySelector(".yourMoves")
        yourMoves.innerHTML = moves 
        clearInterval(countTime)
        seconds = 0
        minutes = 0 
        hours = 0
        timerStart = 0
}
}
document.querySelector(".close-button").addEventListener("click", toggleModal)
document.querySelector(".modal-restart").addEventListener("click", restartGame)


// i´ve got Insparation from 
// https://www.w3schools.com/howto/howto_css_modals.asp
// https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript



    /* in der allcards Loop arbeiten für alles
    ---
    clickevent pro /karte = listelement/ ( class hinzufügen )
    open ändert die Farbe der Card 
    show zeigt das Icon an 
    match färbt das icon grün
    show class verstehen und nutzen 
    ---
    leere Array zwei karten öffen packe ich darein 
    vergleiche wenn gleich wieder neuer array 
    wenn nicht gleich hole ich die wieder aus der array raus 
    ---
    */

// console.log(allcards)
// function gameOver(game) {
//     for each (card in game) {
//         return false
//     }
// };
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
