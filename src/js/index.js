// добавление сказок в закладки
// отметка сказки, как прочитанной
// год создания/текущий год в футере

let btnSaveFavorites = document.querySelector('.btn-save__favorites')
let bookmarksContainer = document.querySelector('.bookmarks__container')
let btnMarkRead = document.querySelector('.fairytale__btn-read')
let titleFairyTale = document.querySelector("#title-fairytale")
let footerDate = document.querySelector('.footer__date')

const arrColorMarks = ['#FFDADA', '#FFEDB6', '#CCDFD7']
let numIndex = 0

const favoriteKey = 'favoriteFairyTales'
const arrReadKey = 'arrReadFairytale'

function getFavorites(key) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
}

function saveFavorites(key, favorites) {
    return localStorage.setItem(key, JSON.stringify(favorites))
}

// добавить закладку на страницах
function addFavorite(fairytale) {

    let arrFavorites = getFavorites(favoriteKey)

    arrFavorites.push(fairytale)
    saveFavorites(favoriteKey, arrFavorites)

    const newBookmark = document.createElement('div')
    newBookmark.classList.add("mark__favorites")
    newBookmark.style.backgroundColor = arrColorMarks[numIndex]
    newBookmark.innerHTML = `
        <a href="${fairytale.url}" class="link__favorites">${fairytale.title} target="_blank"</a>
            <div class="btn__remove" data-title="${fairytale.title}"></div>
            <span class="mark__tooltip">Читать</span>
        `
    if (bookmarksContainer)
        bookmarksContainer.appendChild(newBookmark);
    numIndex = numIndex < arrColorMarks.length ? numIndex + 1 : numIndex = 0
}

//сразу отрисовать закладку на всех страницах
function renderBookmarks() {
    let arrFavorites = getFavorites(favoriteKey)

    if (bookmarksContainer) {
        bookmarksContainer.innerHTML = arrFavorites.map((mark, i) => {
            let color = arrColorMarks[i % arrColorMarks.length]; // Цвет чередуется

            return `<div class="mark__favorites" style="background-color: ${color}">
                <a href="${mark.url}" class="link__favorites" target="_blank">
                    ${mark.title}
                </a>
                <div class="btn__remove" data-title="${mark.title}"></div>
            <span class="mark__tooltip">Читать</span>
            </div>`
        }).join("") // Преобразуем массив в строку
    }
}

// поменялись строки
function paintBtnSaveFavorites() {
    //let arrSaveFairytale = JSON.parse(localStorage.getItem('favoriteFairyTales'))
    let arrSaveFairytale = getFavorites(favoriteKey)

    if (!titleFairyTale) return
    let exists = arrSaveFairytale.some(item => item.title === titleFairyTale.textContent.trim())

    if (exists) {
        btnSaveFavorites.classList.add('btn-save_green')
    } else {
        btnSaveFavorites.classList.remove('btn-save_green')
    }
}

// добавляет сказку в закладки
if (btnSaveFavorites) {
    btnSaveFavorites.addEventListener('click', function () {
        let fairytale = {
            title: document.querySelector('.title_fairytale').textContent.trim(),
            url: window.location.href,
        }

        let arrFavorites = getFavorites(favoriteKey)

        let exists = arrFavorites.some(item => item.title === fairytale.title)

        //удаление сказки из массива прочитанных
        let arrReadFairytale = getReadFairytale()
        let updateReadFairytale = arrReadFairytale.filter(item => item.url !== fairytale.url)
        saveReadFairytale(updateReadFairytale)
        renderMarkRead()
        btnMarkRead.textContent = 'Отметить как прочитано'

        if (!exists) {
            btnSaveFavorites.classList.add('btn-save_green')
            addFavorite(fairytale)
        }

        renderBookmarks()
    })
}

// удаление сказки из закладок
if (bookmarksContainer)
    bookmarksContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn__remove')) {
            let titleRemove = event.target.getAttribute('data-title')
            let arrFavorites = getFavorites(favoriteKey).filter(item => item.title !== titleRemove)
            saveFavorites(favoriteKey, arrFavorites)
            renderBookmarks()
            paintBtnSaveFavorites()
        }
    })

// раздел отмеченных сказок как прочитанные
// Отметить прочитанные сказки
function getReadFairytale() {
    let data = localStorage.getItem(arrReadKey)
    return data ? JSON.parse(data) : []
}

function saveReadFairytale(arrFairytale) {
    return localStorage.setItem(arrReadKey, JSON.stringify(arrFairytale))
}

function addReadFairytale(fairytaleRead) {
    let arrReadFairytale = getReadFairytale()
    let exists = arrReadFairytale.some(item => item.url === fairytaleRead.url)

    if (!exists) {
        arrReadFairytale.push(fairytaleRead)
        saveReadFairytale(arrReadFairytale)
    }
}

function renderMarkRead() {
    let arrReadFairytale = getReadFairytale()

    let cards = document.querySelectorAll('.card')

    if (cards)
        cards.forEach(card => {
            let link = card.querySelector('.card__link')
            let mark = link.querySelector('.card__mark-read')

            if (link && arrReadFairytale.some(fairytale => fairytale.url === link.href)) {
                mark.classList.add('mark-read__visible')
            } else {
                mark.classList.remove('mark-read__visible')
            }
        })
}

// сохраняет прочитанные сказки в массив в локально хранилище
// отрисовывает на карточке сказки метку прочитано
// меняет текст у кнопки на - Прочитано
// удаляет сказку из закладок
if (btnMarkRead)
    btnMarkRead.addEventListener('click', function () {
        let fairytaleRead = {
            url: window.location.href,
        }

        addReadFairytale(fairytaleRead)
        renderMarkRead()

        let arrFavorites = getFavorites(favoriteKey).filter(item => item.url !== fairytaleRead.url)
        saveFavorites(favoriteKey, arrFavorites)
        renderBookmarks()

        btnMarkRead.textContent = 'Прочитано'
        paintBtnSaveFavorites()

    })

// изменение даты футера
let date = new Date()
let currentYear = date.getFullYear()

if (footerDate) {
    if (currentYear === 2025) {
        footerDate.textContent = `${currentYear}`
    } else {
        footerDate.textContent = `2025-${currentYear}`
    }
}

// следит за изменениями в локальном хранилище
window.addEventListener("storage", (event) => {
    if (event.key === arrReadKey) {
        renderMarkRead()
    }
})

// следит за изменениями массива сказок в локальном хранилище
window.addEventListener("storage", (event) => {
    if (event.key === favoriteKey) {
        renderBookmarks()
        paintBtnSaveFavorites()
    }
})

// отрисовывает каждый раз при заходе на страницу
document.addEventListener("DOMContentLoaded", renderBookmarks);

document.addEventListener("DOMContentLoaded", renderMarkRead);

document.addEventListener("DOMContentLoaded", paintBtnSaveFavorites);