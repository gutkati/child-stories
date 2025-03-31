let pageNM = document.querySelector('.page')
let pageFairytaleNM = document.querySelector('#page-fairytale')
let title = document.querySelector('.title')
let subtitle = document.querySelector('.subtitle-text')
let btnSwitchThemeNM = document.querySelector('.sun')
let inputSearch = document.querySelector('.inp__text')
let arrTextFairytale = document.querySelectorAll('.fairytale')
let messageSearch = document.querySelector('.message__search')
let textNotfound = document.querySelector('.container__notfound')
let arrCards = document.querySelectorAll('.card')

// тема ночная/дневная
// При загрузке страницы проверяем тему

window.addEventListener("storage", (event) => {
    if (event.key === 'theme') {
        applyThemeNM()
    }
})

// // применит тему при каждом возврате на страницу
// window.addEventListener("pageshow", applyTheme)

// убедиться, что все элементы загружены перед применением классов:
document.addEventListener("DOMContentLoaded", () => {
    applyThemeNM()
})

function applyThemeNM() {
    if (localStorage.getItem("theme") === "dark") {
        pageNM.classList.add('dark-back');
        pageFairytaleNM ? pageFairytaleNM.classList.add('dark-back') : ""
        title.classList.add('dark-text');
        subtitle ? subtitle.classList.add('dark-subtitle') : ""
        inputSearch ? inputSearch.classList.add('dark-text') : ""
        arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.classList.add('dark-text')
        }) : ""
        messageSearch ? messageSearch.classList.add('dark-text') : ""
        textNotfound ? textNotfound.classList.add('dark-text') : ""
        btnSwitchThemeNM.src = '../assets/icons/month.png';

        arrCards ? arrCards.forEach(card => {
            card.classList.add('dark-card')
            let cardTitle = card.querySelector('.card__title')
            cardTitle.classList.add('dark-card__info')
        }) : ""
    } else {
        pageNM.classList.remove('dark-back');
        pageFairytaleNM ? pageFairytaleNM.classList.remove('dark-back') : ""
        title.classList.remove('dark-text');
        subtitle?.classList.remove('dark-subtitle');
        inputSearch?.classList.remove('dark-text');
        arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.classList.remove('dark-text')
        }) : ""
        messageSearch ? messageSearch.classList.remove('dark-text') : ""
        textNotfound ? textNotfound.classList.remove('dark-text') : ""
        btnSwitchThemeNM.src = '../assets/icons/sun.png';

        arrCards ? arrCards.forEach(card => {
            card.classList.remove('dark-card')
            let cardTitle = card.querySelector('.card__title')
            cardTitle.classList.remove('dark-card__info')
        }) : ""
    }
}
btnSwitchThemeNM.addEventListener('click', switchTheme)

function switchTheme() {
    let iconName = btnSwitchThemeNM.src.split('/').pop() // Получаем только имя файла

    pageNM.classList.toggle('dark-back')
    pageFairytaleNM ? pageFairytaleNM.classList.toggle('dark-back') : ""
    title.classList.toggle('dark-text')
    subtitle ? subtitle.classList.toggle('dark-subtitle') : ""
    inputSearch ? inputSearch.classList.toggle('dark-text') : ""
    arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.classList.toggle('dark-text')
        }) : ""
    messageSearch ? messageSearch.classList.toggle('dark-text') : ""
    textNotfound ? textNotfound.classList.toggle('dark-text') : ""

    arrCards ? arrCards.forEach(card => {
            card.classList.toggle('dark-card')
            let cardTitle = card.querySelector('.card__title')
            cardTitle.classList.toggle('dark-card__info')
        }) : ""

    btnSwitchThemeNM.src = (iconName === 'sun.png')
        ? '../assets/icons/month.png'
        : '../assets/icons/sun.png'

    if (pageNM.classList.contains('dark-back')) {
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.setItem("theme", "light")
    }
}