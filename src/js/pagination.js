import {arrayCards} from "../arrays/arrayCards.js";
let btnArrowLeftUp = document.querySelector('.left-arrow-up')
let btnArrowRightUp = document.querySelector('.right-arrow-up')
let btnArrowLeftBot = document.querySelector('.left-arrow-bot')
let btnArrowRightBot = document.querySelector('.right-arrow-bot')

// Пагинация

const itemsPerPage = 8;
const items = arrayCards.map(card => {
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

let currentPage = 1

function renderItems(page) {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    document.getElementById("items").innerHTML = items
        .slice(start, end)
        .join("")

    renderPagination()
}

function renderPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const pagination = document.querySelector(".pagination");
    const paginationBottom = document.querySelector(".pagination-bottom")
    pagination.innerHTML = ""
    paginationBottom.innerHTML = ""

    function createButtonNum(pagination, text, page, disabled = false) {
        const btn = document.createElement("button")
        btn.innerText = text
        btn.classList.add('btn-num')
        btn.disabled = disabled
        btn.addEventListener("click", () => {
            currentPage = page
            renderItems(page)
        })
        pagination.appendChild(btn)
    }

    function createButtonArrow(pagination, btn, page, disabled = false) {
        btn.disabled = disabled
        btn.addEventListener("click", () => {
            currentPage = page
            renderItems(page)
        })
        pagination.appendChild(btn)
    }

// Кнопка "Назад"
    createButtonArrow(pagination, btnArrowLeftUp, currentPage - 1, currentPage === 1)
    createButtonArrow(paginationBottom, btnArrowLeftBot, currentPage - 1, currentPage === 1)

// Генерация страниц
    let pages = []
    if (totalPages <= 5) {
        pages = Array.from({length: totalPages}, (_, i) => i + 1)
    } else {
        pages = [1, 2, "..."]
        for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
            pages.push(i)
        }
        pages.push("...", totalPages - 1, totalPages)
    }

    pages.forEach(page => {
        if (page === "...") {
            const spanUp = document.createElement("span")
            const spanBot = document.createElement("span")
            spanUp.classList.add('ellipses')
            spanBot.classList.add('ellipses')
            spanUp.innerText = "..."
            spanBot.innerText = "..."
            pagination.appendChild(spanUp)
            paginationBottom.appendChild(spanBot)
        } else {
            createButtonNum(pagination, page, page, page === currentPage)
            createButtonNum(paginationBottom, page, page, page === currentPage)
        }
    })

// Кнопка "Вперед"
    createButtonArrow(pagination, btnArrowRightUp, currentPage + 1, currentPage === totalPages)
    createButtonArrow(paginationBottom, btnArrowRightBot, currentPage + 1, currentPage === totalPages)
}

renderItems(1)
