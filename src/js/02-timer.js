// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

let currentDate = null;
let intervalId = null;
const startBtn = document.querySelector('button[data-start]');
const dateNow = Date.now();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > dateNow) {
      startBtn.disabled = false;
      currentDate = selectedDates[0];
      console.log(currentDate);
    }
  },
};

startBtn.disabled = true;
startBtn.addEventListener('click', onClickBtn);

flatpickr('#datetime-picker', options);

function onClickBtn() {
  intervalId = setInterval(() => {
    console.log(currentDate - 1000);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
