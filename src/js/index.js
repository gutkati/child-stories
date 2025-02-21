let page = document.querySelector('.page')
let title = document.querySelector('.title')
let subtitle = document.querySelector('.subtitle-text')
let btnSwitchTheme = document.querySelector('.sun')
let themeDark = false

btnSwitchTheme.addEventListener('click', switchTheme)

function switchTheme() {
    let iconName = btnSwitchTheme.src.split('/').pop() // Получаем только имя файла

    btnSwitchTheme.src = (iconName === 'sun.png')
        ? '../assets/icons/month.png'
        : '../assets/icons/sun.png'

    page.classList.toggle('dark-back')
    title.classList.toggle('dark-title')
    subtitle.classList.toggle('dark-subtitle')
}