import {arrayCards} from "../arrays/arrayCards.js";

let randomIndexCards = getRandomIndexCards(arrayCards)

const items = randomIndexCards.map(numCard => {
    let card = arrayCards[numCard]

    return `<div class="card">
        <a href="../pages/fairytale.html" class="card__img">
            <img src="${card.img}" alt="${card.name}">
                <div class="card__time">
                    <p class="time">${card.time} мин</p>
                </div>
        </a>
        <div class="card__info">
            <p class="card_title">${card.name}</p>
            <p class="card__author">${card.author}</p>
        </div>
    </div>`
})

document.getElementById("items-main").innerHTML = items.join("")

function getRandomIndexCards(array) {
    let minNum = 0
    let maxNum = array.length
    let arrNum = []

    for (let i = 1; i <= 4; i++) {
        let randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
        if (!arrNum.includes(randomNumber)) {
            arrNum.push(randomNumber)
        }
    }
    return arrNum
}