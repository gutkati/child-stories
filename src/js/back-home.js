let btnBack = document.getElementById('btn-back')
if (btnBack) {
    btnBack.addEventListener('click', () => {
        window.history.back();
    })
}