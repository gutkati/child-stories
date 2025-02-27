let page = document.querySelector('.page')
let title = document.querySelector('.title')
let subtitle = document.querySelector('.subtitle-text')
let btnSwitchTheme = document.querySelector('.sun')
// let inputMain = document.querySelector('#inp-main')
// let inputSection = document.querySelector('#inp-section')
let inputSearch = document.querySelector('.inp__text')
let btnArrowLeftUp = document.querySelector('.left-arrow-up')
let btnArrowRightUp = document.querySelector('.right-arrow-up')
let btnArrowLeftBot = document.querySelector('.left-arrow-bot')
let btnArrowRightBot = document.querySelector('.right-arrow-bot')

// При загрузке страницы проверяем тему
if (localStorage.getItem("theme") === "dark") {
    page.classList.add('dark-back');
    title.classList.add('dark-text');
    subtitle ? subtitle.classList.add('dark-subtitle') : ""
    inputSearch.classList.add('dark-text')
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
    inputSearch.classList.toggle('dark-text')

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

// Пагинация

const itemsPerPage = 8;
const items = Array.from({length: 50}, (_, i) =>
    `<div class="card">
        <div class="card__img">
            <img src="../assets/images/chicken-tale.jpg">
                <div class="card__time">
                    <p class="time">3 мин</p>
                </div>
        </div>
        <div class="card__info">
            <p class="card_title">Курочка ряба </p>
            <p class="card__author">Народная сказка</p>
        </div>
    </div>`
);
let currentPage = 1;

function renderItems(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    document.getElementById("items").innerHTML = items
        .slice(start, end)
        .join("");

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const pagination = document.querySelector(".pagination");
    const paginationBottom = document.querySelector(".pagination-bottom")
    pagination.innerHTML = "";
    paginationBottom.innerHTML = ""

    function createButtonNum(pagination, text, page, disabled = false) {
        const btn = document.createElement("button");
        btn.innerText = text;
        btn.classList.add('btn-num')
        btn.disabled = disabled;
        btn.addEventListener("click", () => {
            currentPage = page;
            renderItems(page);
        });
        pagination.appendChild(btn);
    }

    function createButtonArrow(pagination, btn, page, disabled = false) {
        btn.disabled = disabled;
        btn.addEventListener("click", () => {
            currentPage = page;
            renderItems(page);
        });
        pagination.appendChild(btn);
    }

// Кнопка "Назад"
    createButtonArrow(pagination, btnArrowLeftUp, currentPage - 1, currentPage === 1);
    createButtonArrow(paginationBottom, btnArrowLeftBot, currentPage - 1, currentPage === 1);

// Генерация страниц
    let pages = [];
    if (totalPages <= 5) {
        pages = Array.from({length: totalPages}, (_, i) => i + 1);
    } else {
        pages = [1, 2, "..."];
        for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
            pages.push(i);
        }
        pages.push("...", totalPages - 1, totalPages);
    }

    pages.forEach(page => {
        if (page === "...") {
            const spanUp = document.createElement("span");
            const spanBot = document.createElement("span");
            spanUp.classList.add('ellipses')
            spanBot.classList.add('ellipses')
            spanUp.innerText = "...";
            spanBot.innerText = "...";
            pagination.appendChild(spanUp);
            paginationBottom.appendChild(spanBot);
        } else {
            createButtonNum(pagination, page, page, page === currentPage);
            createButtonNum(paginationBottom, page, page, page === currentPage);
        }
    });

// Кнопка "Вперед"
    createButtonArrow(pagination, btnArrowRightUp, currentPage + 1, currentPage === totalPages);
    createButtonArrow(paginationBottom, btnArrowRightBot, currentPage + 1, currentPage === totalPages);
}

renderItems(1);