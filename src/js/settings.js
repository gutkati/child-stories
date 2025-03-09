let btnToTopScroll = document.getElementById('btn-scroll')
let btnSettings = document.querySelector('#btn-settings')
let modalSettings = document.querySelector('.modal__settings')
let closeModalSettings = document.querySelector('.btn__close')
let selectSizeTitle = document.querySelector('select[name="size-title"]')
let selectSizeText = document.querySelector('select[name="size-text"]')
let selectFontFamily = document.querySelector('select[name="font-family"]')
let selectLineHeight = document.querySelector('select[name="line-height"]')
let titleFairytale = document.querySelector("#title-fairytale")
let textFairytale = document.querySelector("#text-fairytale")
let selectColor = document.querySelector("#select-color")
let selectBackground = document.querySelector("#select-background")
let colorPreviewText = document.querySelector('.color-preview_text')
let colorPreviewBackground = document.querySelector('.color-preview_background')
let btnResetSettings = document.querySelector('.modal__btn-settings')

let page = document.querySelector('.page')
let btnSwitchTheme = document.querySelector('.sun')

let pageFairytale = document.querySelector('.page_fairytale')
let fairytale = document.querySelector('.fairytale')

let defaultBackgroundLight = "rgb(250, 250, 250)"
let defaultColorTextLight = "rgb(69, 69, 69)"
let defaultBackgroundDark = "rgb(39, 39, 39)"
let defaultColorTextDark = "rgb(228, 228, 228)"

// применит тему при каждом возврате на страницу
window.addEventListener("pageshow", applyTheme)

// убедиться, что все элементы загружены перед применением классов:
document.addEventListener("DOMContentLoaded", () => {
    applyTheme()
})

// скролл страницы сказки
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        btnToTopScroll.style.display = 'block'
    } else {
        btnToTopScroll.style.display = 'none'
    }
})

// сохранить скролл страницы

document.addEventListener("DOMContentLoaded", () => {
    const scrollPosition = localStorage.getItem("fairyTaleScroll")
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition))
    }
})

window.addEventListener("beforeunload", () => {
    localStorage.setItem("fairyTaleScroll", window.scrollY);
})

// модальное окно настроек сказки
btnSettings.addEventListener('click', () => {
    modalSettings.style.display = 'flex'

    // записать цвета по умолчанию в локальное хранилище
    if (!localStorage.getItem("backgroundLight")) {
        localStorage.setItem("backgroundLight", defaultBackgroundLight)
    }

    if (!localStorage.getItem("textColorLight")) {
        localStorage.setItem("textColorLight", defaultColorTextLight)
    }

    if (!localStorage.getItem("backgroundDark")) {
        localStorage.setItem("backgroundDark", defaultBackgroundDark)
    }

    if (!localStorage.getItem("textColorDark")) {
        localStorage.setItem("textColorDark", defaultColorTextDark)
    }

    applyTheme()

})

closeModalSettings.addEventListener('click', () => {
    modalSettings.style.display = 'none'
})

//настройки
let savedSizeTitle = localStorage.getItem('sizeTitle')

if (savedSizeTitle) {
    selectSizeTitle.value = savedSizeTitle
    titleFairytale.style.fontSize = savedSizeTitle + 'px'
}

selectSizeTitle.addEventListener('change', function () {
    localStorage.setItem('sizeTitle', this.value)
    titleFairytale.style.fontSize = this.value + 'px'
})

let savedSizeText = localStorage.getItem('sizeText')

if (savedSizeText) {
    selectSizeText.value = savedSizeText
    textFairytale.style.fontSize = savedSizeText + 'px'
}

selectSizeText.addEventListener('change', function () {
    localStorage.setItem('sizeText', this.value)
    textFairytale.style.fontSize = this.value + 'px'
})

let savedLineHeight = localStorage.getItem('lineHeight')

if (savedLineHeight) {
    selectLineHeight.value = savedLineHeight
    textFairytale.style.lineHeight = savedLineHeight
}

selectLineHeight.addEventListener('change', function () {
    localStorage.setItem('lineHeight', this.value)
    textFairytale.style.lineHeight = this.value
})

let savedFontFamily = localStorage.getItem('fontFamily')

if (savedFontFamily) {
    selectFontFamily.value = savedFontFamily
    textFairytale.style.fontFamily = savedFontFamily
}

selectFontFamily.addEventListener('change', function () {
    localStorage.setItem('fontFamily', this.value)
    textFairytale.style.fontFamily = this.value
})

// Функция для применения темы и настроек цветов
function applyTheme() {
    let theme = localStorage.getItem("theme") || "light";
    let backgroundKey = theme === "dark" ? "backgroundDark" : "backgroundLight";
    let textColorKey = theme === "dark" ? "textColorDark" : "textColorLight";

    // Применяем тему (темную или светлую)
    if (theme === "dark") {
        page.classList.add("dark-back")
        pageFairytale ? pageFairytale.classList.add("dark-back") : ''
        fairytale ? fairytale.classList.add('dark-text') : ''
        btnSwitchTheme.src = "../assets/icons/month.png";

    } else {
        page.classList.remove("dark-back");
        pageFairytale ? pageFairytale.classList.remove("dark-back") : ''
        fairytale ? fairytale.classList.remove('dark-text') : ''
        btnSwitchTheme.src = "../assets/icons/sun.png";
    }

    // Применяем сохраненный цвет фона
    let savedBackground = localStorage.getItem(backgroundKey);
    if (savedBackground) {
        selectBackground.value = savedBackground;
        pageFairytale.style.backgroundColor = savedBackground;
        colorPreviewBackground.style.backgroundColor = savedBackground;
    }

    // Применяем сохраненный цвет текста
    let savedTextColor = localStorage.getItem(textColorKey);
    if (savedTextColor) {
        selectColor.value = savedTextColor;
        fairytale.style.color = savedTextColor;
        colorPreviewText.style.backgroundColor = savedTextColor;
    }
}

// Переключение темы
btnSwitchTheme.addEventListener("click", switchTheme);

function switchTheme() {
    let currentTheme = localStorage.getItem("theme") || "light";
    let newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    applyTheme();
}

// Обработчик изменения цвета фона
selectBackground.addEventListener("change", function () {
    let theme = localStorage.getItem("theme") || "light";
    let backgroundKey = theme === "dark" ? "backgroundDark" : "backgroundLight";

    localStorage.setItem(backgroundKey, this.value);
    pageFairytale.style.backgroundColor = this.value;
    colorPreviewBackground.style.backgroundColor = this.value;
});

// Обработчик изменения цвета текста
selectColor.addEventListener("change", function () {
    let theme = localStorage.getItem("theme") || "light";
    let textColorKey = theme === "dark" ? "textColorDark" : "textColorLight";

    localStorage.setItem(textColorKey, this.value);
    fairytale.style.color = this.value;
    colorPreviewText.style.backgroundColor = this.value;
});

btnResetSettings.addEventListener('click', function () {
    localStorage.removeItem('sizeTitle')
    localStorage.removeItem('sizeText')
    localStorage.removeItem('lineHeight')
    localStorage.removeItem('fontFamily')

    localStorage.setItem("backgroundLight", defaultBackgroundLight)
    localStorage.setItem("textColorLight", defaultColorTextLight)
    localStorage.setItem("backgroundDark", defaultBackgroundDark)
    localStorage.setItem("textColorDark", defaultColorTextDark)

    titleFairytale.style = ''
    textFairytale.style = ''
    pageFairytale.style = ''
    fairytale.style = ''
    colorPreviewBackground.style = ''
    colorPreviewText.style = ''

    selectSizeTitle.value = '40'
    selectSizeText.value = '20'
    selectLineHeight.value = '1.7'
    selectFontFamily.value = 'Arial'

    applyTheme()
})