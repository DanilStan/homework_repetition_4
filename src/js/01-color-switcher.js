const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

function onClickStart() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStop() {
  startBtn.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
