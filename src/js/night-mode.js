let page = document.querySelector('.page')
let title = document.querySelector('.title')
let subtitle = document.querySelector('.subtitle-text')
let btnSwitchTheme = document.querySelector('.sun')
let inputSearch = document.querySelector('.inp__text')
let fairytale = document.querySelector('.fairytale')

// тема ночная/дневная
// При загрузке страницы проверяем тему

// применит тему при каждом возврате на страницу
window.addEventListener("pageshow", applyTheme)

// убедиться, что все элементы загружены перед применением классов:
document.addEventListener("DOMContentLoaded", () => {
    applyTheme()
})

function applyTheme() {
    if (localStorage.getItem("theme") === "dark") {
        page.classList.add('dark-back');
        title.classList.add('dark-text');
        subtitle ? subtitle.classList.add('dark-subtitle') : ""
        inputSearch ? inputSearch.classList.add('dark-text') : ""
        fairytale ? fairytale.classList.add('dark-text') : ""
        btnSwitchTheme.src = '../assets/icons/month.png';
    } else {
        page.classList.remove('dark-back');
        title.classList.remove('dark-text');
        subtitle?.classList.remove('dark-subtitle');
        inputSearch?.classList.remove('dark-text');
        fairytale?.classList.remove('dark-text');
        btnSwitchTheme.src = '../assets/icons/sun.png';
    }
}

btnSwitchTheme.addEventListener('click', switchTheme)

function switchTheme() {
    console.log("Функция switchTheme вызвана")
    let iconName = btnSwitchTheme.src.split('/').pop() // Получаем только имя файла

    page.classList.toggle('dark-back')
    title.classList.toggle('dark-text')
    subtitle ? subtitle.classList.toggle('dark-subtitle') : ""
    inputSearch ? inputSearch.classList.toggle('dark-text') : ""
    fairytale ? fairytale.classList.toggle('dark-text') : ""

    btnSwitchTheme.src = (iconName === 'sun.png')
        ? '../assets/icons/month.png'
        : '../assets/icons/sun.png'

    if (page.classList.contains('dark-back')) {
        console.log("Добавляем dark в localStorage")
        localStorage.setItem("theme", "dark")
    } else {
        console.log("Добавляем light в localStorage")
        localStorage.setItem("theme", "light")
    }
}

