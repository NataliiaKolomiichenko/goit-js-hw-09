const refs = {
    bodyEl: document.querySelector('body'),
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
}

let intervalId = null;
refs.stopBtnEl.disabled = true;

refs.startBtnEl.addEventListener('click', () => {
    intervalId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000
    )
    refs.startBtnEl.disabled = true;
    refs.stopBtnEl.disabled = false;
})

refs.stopBtnEl.addEventListener('click', () => {
    clearInterval(intervalId);
    refs.startBtnEl.disabled = false;
    refs.stopBtnEl.disabled = true;
})


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

