// скролл страницы наверх
// сохранение скролла сказки при уходе со страницы
// настройки в модальном окне на странице сказки

let btnSettings = document.querySelector('#btn-settings')
let modalSettings = document.querySelector('.modal__settings')
let closeModalSettings = document.querySelector('.btn__close')
let selectSizeTitle = document.querySelector('select[name="size-title"]')
let selectSizeText = document.querySelector('select[name="size-text"]')
let selectFontFamily = document.querySelector('select[name="font-family"]')
let selectLineHeight = document.querySelector('select[name="line-height"]')
let titleFairytale = document.querySelector("#title-fairytale")
let arrTextFairytale = document.querySelectorAll(".fairytale")

let inputMargin = document.querySelector('.inp-margin')
let selectColor = document.querySelector("#select-color")
let selectBackground = document.querySelector("#select-background")
let colorPreviewText = document.querySelector('.color-preview_text')
let colorPreviewBackground = document.querySelector('.color-preview_background')
let btnResetSettings = document.querySelector('.modal__btn-settings')
let page = document.querySelector('.page')
let pageContainer = document.querySelector('.page__container')
let btnSwitchTheme = document.querySelector('.sun')
let btnMarkRead = document.querySelector('.fairytale__btn-read')

let pageFairytale = document.querySelector('#page-fairytale')
let margitPageFairytale = document.querySelector('#page-container-fairytale')

let defaultBackgroundLight = "rgb(250, 250, 250)"
let defaultColorTextLight = "rgb(69, 69, 69)"
let defaultBackgroundDark = "rgb(39, 39, 39)"
let defaultColorTextDark = "rgb(228, 228, 228)"

window.addEventListener("storage", (event) => {
    if (event.key === 'theme') {
        applyTheme()
    }
})

// убедиться, что все элементы загружены перед применением классов:
document.addEventListener("DOMContentLoaded", () => {
    applyTheme()
})

// скролл страницы сказки вверх
let scrollUpBtn = document.querySelector('.btn-up__page')
let scrollSaveBtn = document.querySelector('.btn-save__favorites')
let lastScrollTop = window.scrollY
let hideTimeout

window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY
    if (currentScroll < lastScrollTop) {

        if (currentScroll > 400) {
            scrollUpBtn ? scrollUpBtn.style.display = 'block' : ""
        }
        scrollSaveBtn ? scrollSaveBtn.style.display = 'block' : ""

        clearTimeout(hideTimeout)

        hideTimeout = setTimeout(() => {
            scrollUpBtn ? scrollUpBtn.style.display = 'none' : ""
            scrollSaveBtn ? scrollSaveBtn.style.display = 'none' : ""
        }, 3000)
    }

    lastScrollTop = currentScroll
})

if (scrollUpBtn)
    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    })

// сохранить скролл страницы

const arrFairytaleKey = 'arrFairytaleScroll'

function getFairytale() {
    let data = localStorage.getItem(arrFairytaleKey)
    return data ? JSON.parse(data) : []
}

function saveFairytale(favorites) {
    return localStorage.setItem(arrFairytaleKey, JSON.stringify(favorites))
}

function saveScrollPosition() {
    let arrFairytale = getFairytale(arrFairytaleKey)

    let fairytale = {
        url: window.location.href,
        scroll: window.scrollY
    }

    let exists = arrFairytale.some(item => item.url === fairytale.url)

    if (!exists) {
        arrFairytale.push(fairytale)

    } else {
        arrFairytale = arrFairytale.map(item =>
            item.url === fairytale.url
                ? {...item, scroll: window.scrollY}
                : item
        )
    }

    saveFairytale(arrFairytale)
}

// Восстанавливаем скролл при загрузке
document.addEventListener("DOMContentLoaded", () => {
    let arrFairytale = getFairytale(arrFairytaleKey);
    let currentFairytale = arrFairytale.find(item => item.url === window.location.href);

    if (!currentFairytale) {
        let newFairytale = {url: window.location.href, scroll: 0};
        arrFairytale.push(newFairytale);
        saveFairytale(arrFairytale);
    } else {
        window.scrollTo(0, currentFairytale.scroll)
    }

})

// Сохраняем скролл при уходе со страницы
window.addEventListener("beforeunload", saveScrollPosition)

// модальное окно настроек сказки
if (btnSettings) {
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
}

if (closeModalSettings) {
    closeModalSettings.addEventListener('click', () => {
        modalSettings.style.display = 'none'
    })
}
// настройки

// настройки заголовка сказки
let savedSizeTitle = localStorage.getItem('sizeTitle')

if (savedSizeTitle) {
    selectSizeTitle.value = savedSizeTitle
    titleFairytale ? titleFairytale.style.fontSize = savedSizeTitle + 'px' : ""
}

if (selectSizeTitle) {
    selectSizeTitle.addEventListener('change', function () {
        localStorage.setItem('sizeTitle', this.value)
        titleFairytale ? titleFairytale.style.fontSize = this.value + 'px' : ""
    })
}
// настройки текста сказки
let savedSizeText = localStorage.getItem('sizeText')
let savedLineHeight = localStorage.getItem('lineHeight')
let savedFontFamily = localStorage.getItem('fontFamily')

arrTextFairytale.forEach(textFairytale => {
    if (savedSizeText) {
        selectSizeText.value = savedSizeText
        textFairytale.style.fontSize = savedSizeText + 'px'
    }

    if (savedLineHeight) {
        selectLineHeight.value = savedLineHeight
        textFairytale.style.lineHeight = savedLineHeight
    }

    if (savedFontFamily) {
        selectFontFamily.value = savedFontFamily
        textFairytale.style.fontFamily = savedFontFamily
    }
})

if (selectSizeText) {
    selectSizeText.addEventListener('change', function () {
        localStorage.setItem('sizeText', this.value)
        arrTextFairytale.forEach(textFairytale => {
            textFairytale.style.fontSize = this.value + 'px'
        })
    })
}

if (selectLineHeight) {
    selectLineHeight.addEventListener('change', function () {
        localStorage.setItem('lineHeight', this.value)
        arrTextFairytale.forEach(textFairytale => {
            textFairytale.style.lineHeight = this.value
        })
    })
}

if (selectFontFamily) {
    selectFontFamily.addEventListener('change', function () {
        localStorage.setItem('fontFamily', this.value)
        arrTextFairytale.forEach(textFairytale => {
            textFairytale.style.fontFamily = this.value
        })
    })
}

// следит за изменением ширины экрана
window.addEventListener("resize", () => {
    let parentWidth = page.parentElement.clientWidth // Получаем ширину родителя
    let pageWidth = pageContainer.clientWidth // Получаем ширину элемента

    let newMargin = (parentWidth - pageWidth) / 2 // Вычисляем margin
    inputMargin.value = newMargin
})

let parentWidth = page.parentElement.clientWidth // Получаем ширину родителя

function getCurrentMargin() {
    let parentWidth = page.parentElement.clientWidth // Получаем ширину родителя
    let pageWidth = pageContainer.clientWidth // Получаем ширину элемента

    let newMargin = (parentWidth - pageWidth) / 2 // Вычисляем margin
    if (inputMargin) {
        return inputMargin.value = newMargin
    }
}

getCurrentMargin()

if (margitPageFairytale) {
    let savedSizeMargin = localStorage.getItem('margin')
    if (savedSizeMargin) {
        inputMargin.value = savedSizeMargin
        margitPageFairytale.style.marginLeft = savedSizeMargin + 'px'
        margitPageFairytale.style.marginRight = savedSizeMargin + 'px'
        margitPageFairytale.style.width = (parentWidth - (savedSizeMargin * 2)) + 'px'
    }

    if (inputMargin) {
        inputMargin.addEventListener('change', function () {
            localStorage.setItem('margin', this.value)
            margitPageFairytale.style.marginLeft = this.value + 'px'
            margitPageFairytale.style.marginRight = this.value + 'px'
            margitPageFairytale.style.width = (parentWidth - (this.value * 2)) + 'px'
        })
    }
}

// Функция для применения темы и настроек цветов
function applyTheme() {
    let theme = localStorage.getItem("theme") || "light"
    let backgroundKey = theme === "dark" ? "backgroundDark" : "backgroundLight"
    let textColorKey = theme === "dark" ? "textColorDark" : "textColorLight"

    //Применяем тему (темную или светлую)
    if (theme === "dark") {
        // page.classList.add("dark-back")
        pageFairytale ? pageFairytale.classList.add("dark-back") : ''
        arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.classList.add('dark-text')
        }) : ""
        btnSwitchTheme.src = "../assets/icons/month.png"

    } else {
        // page.classList.remove("dark-back")
        pageFairytale ? pageFairytale.classList.remove("dark-back") : ''
        arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.classList.remove('dark-text')
        }) : ""
        btnSwitchTheme.src = "../assets/icons/sun.png"
    }

    // Применяем сохраненный цвет фона
    let savedBackground = localStorage.getItem(backgroundKey)
    if (savedBackground) {
        selectBackground ? selectBackground.value = savedBackground : ""
        pageFairytale ? pageFairytale.style.backgroundColor = savedBackground : ""
        colorPreviewBackground ? colorPreviewBackground.style.backgroundColor = savedBackground : ""
    }

    // Применяем сохраненный цвет текста
    let savedTextColor = localStorage.getItem(textColorKey)
    if (savedTextColor) {
        selectColor ? selectColor.value = savedTextColor : ""
        arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.style.color = savedTextColor
        }) : ""

        colorPreviewText ? colorPreviewText.style.backgroundColor = savedTextColor : ""
    }
}

// Переключение темы
btnSwitchTheme.addEventListener("click", switchTheme)

function switchTheme() {
    let currentTheme = localStorage.getItem("theme") || "light"
    let newTheme = currentTheme === "dark" ? "light" : "dark"

    localStorage.setItem("theme", newTheme)
    applyTheme()
}

// Обработчик изменения цвета фона

if (selectBackground) {
    selectBackground.addEventListener("change", function () {
        let theme = localStorage.getItem("theme") || "light"
        let backgroundKey = theme === "dark" ? "backgroundDark" : "backgroundLight"

        localStorage.setItem(backgroundKey, this.value)
        pageFairytale ? pageFairytale.style.backgroundColor = this.value : ""
        colorPreviewBackground ? colorPreviewBackground.style.backgroundColor = this.value : ""
    })
}


// Обработчик изменения цвета текста

if (selectColor) {
    selectColor.addEventListener("change", function () {
        let theme = localStorage.getItem("theme") || "light"
        let textColorKey = theme === "dark" ? "textColorDark" : "textColorLight"
        localStorage.setItem(textColorKey, this.value)
        arrTextFairytale ? arrTextFairytale.forEach(fairytale => {
            fairytale.style.color = this.value
        }) : ""

        colorPreviewText ? colorPreviewText.style.backgroundColor = this.value : ""
    })
}

// сброс настроек

if (btnResetSettings) {
    btnResetSettings.addEventListener('click', function () {
        localStorage.removeItem('sizeTitle')
        localStorage.removeItem('sizeText')
        localStorage.removeItem('lineHeight')
        localStorage.removeItem('fontFamily')
        localStorage.removeItem('margin')

        localStorage.setItem("backgroundLight", defaultBackgroundLight)
        localStorage.setItem("textColorLight", defaultColorTextLight)
        localStorage.setItem("backgroundDark", defaultBackgroundDark)
        localStorage.setItem("textColorDark", defaultColorTextDark)

        titleFairytale.style = ''
        pageFairytale.style = ''
        arrTextFairytale.forEach(fairytale => {
            fairytale.style = ''
        })
        colorPreviewBackground.style = ''
        colorPreviewText.style = ''
        margitPageFairytale.style = ''

        selectSizeTitle.value = '40'
        selectSizeText.value = '20'
        selectLineHeight.value = '1.7'
        selectFontFamily.value = 'Arial'

        getCurrentMargin()
        applyTheme()
    })
}
// Меняется текст у кнопки, когда отмечаем прочитанную сказку
let arrReadFairytale = JSON.parse(localStorage.getItem('arrReadFairytale')) || []
let urlFairytale = window.location.href

if (btnMarkRead) {
    let existsRead = arrReadFairytale.some(item => item.url === urlFairytale)
    btnMarkRead.textContent = existsRead ? 'Прочитано' : 'Отметить как прочитано'
}