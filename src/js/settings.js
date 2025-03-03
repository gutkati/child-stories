let btnToTopScroll = document.getElementById('btn-scroll')
let btnSettings = document.querySelector('#btn-settings')
let modalSettings = document.querySelector('.modal__settings')
let closeModalSettings = document.querySelector('.btn__close')
let selectSizeTitle = document.querySelector('select[name="size-title"]')
let selectSizeText = document.querySelector('select[name="size-text"]')
let selectFontFamily = document.querySelector('select[name="font-family"]')
let titleFairytale = document.querySelector("#title-fairytale")
let textFairytale = document.querySelector('#text-fairytale')
// скролл страницы сказки
window.addEventListener('scroll', () => {
    if(window.scrollY > 200) {
        btnToTopScroll.style.display = 'block'
    } else  {
        btnToTopScroll.style.display = 'none'
    }
})

// модальное окно настроек сказки
btnSettings.addEventListener('click', () => {
    modalSettings.style.display = 'flex'
})

closeModalSettings.addEventListener('click', () => {
    modalSettings.style.display = 'none'
})

//настройки
let savedSizeTitle = localStorage.getItem('sizeTitle')

if(savedSizeTitle) {
    selectSizeTitle.value = savedSizeTitle
    titleFairytale.style.fontSize = savedSizeTitle + 'px'
}

selectSizeTitle.addEventListener('change', function () {
    localStorage.setItem('sizeTitle', this.value)
    titleFairytale.style.fontSize = this.value + 'px'
})

let savedSizeText = localStorage.getItem('sizeText')

if(savedSizeText) {
    selectSizeText.value = savedSizeText
    textFairytale.style.fontSize = savedSizeText + 'px'
}

selectSizeText.addEventListener('change', function () {
    localStorage.setItem('sizeText', this.value)
    textFairytale.style.fontSize = this.value + 'px'
})

let savedFontFamily = localStorage.getItem('fontFamily')

if(savedFontFamily) {
    selectFontFamily.value = savedFontFamily
    textFairytale.style.fontFamily = savedFontFamily
}

selectFontFamily.addEventListener('change', function () {
    localStorage.setItem('fontFamily', this.value)
    textFairytale.style.fontFamily = this.value
})


