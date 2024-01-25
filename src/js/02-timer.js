// Описан в документации
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let currentDate = null;
let intervalId = null;
const startBtn = document.querySelector('button[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      startBtn.disabled = false;
      currentDate = selectedDates[0].getTime();
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};
const refs = {
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;
startBtn.addEventListener('click', onClickBtn);

flatpickr('#datetime-picker', options);

function onClickBtn() {
  calculeteTime();
  intervalId = setInterval(() => {
    calculeteTime();
    // const timeForEnd = currentDate - dateNow;
    // console.log(timeForEnd - 1000);
  }, 1000);
}

function calculeteTime() {
  startBtn.disabled = true;
  const dateNow = new Date();
  const timeForEnd = currentDate - dateNow;
  const resultTime = convertMs(timeForEnd);
  console.log(resultTime);

  refs.daysRef.textContent = resultTime.days;
  refs.hoursRef.textContent = resultTime.hours;
  refs.minutesRef.textContent = resultTime.minutes;
  refs.secondsRef.textContent = resultTime.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
