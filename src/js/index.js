let page = document.querySelector('.page')
let title = document.querySelector('.title')
let subtitle = document.querySelector('.subtitle-text')
let btnSwitchTheme = document.querySelector('.sun')
// let inputMain = document.querySelector('#inp-main')
// let inputSection = document.querySelector('#inp-section')
let inputSearch = document.querySelector('.inp__text')
let fairytale = document.querySelector('.fairytale')

// тема ночная/дневная
// При загрузке страницы проверяем тему
if (localStorage.getItem("theme") === "dark") {
    page.classList.add('dark-back');
    title.classList.add('dark-text');
    subtitle ? subtitle.classList.add('dark-subtitle') : ""
    inputSearch ? inputSearch.classList.add('dark-text') : ""
    fairytale ? fairytale.classList.toggle('dark-text') : ""
    btnSwitchTheme.src = '../assets/icons/month.png';
} else {
    btnSwitchTheme.src = '../assets/icons/sun.png';
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
        console.log("Добавляем dark в localStorage");
        localStorage.setItem("theme", "dark");
    } else {
        console.log("Добавляем light в localStorage");
        localStorage.setItem("theme", "light");
    }
}

