import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const DELTA_DEAD_LINE = 1000;

const refs = {
  selectedDates: null,
  intervalId: null,

  input: document.querySelector('input[type="text"]'),
  buttonStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.buttonStart.disabled = false;
      refs.selectedDates = selectedDates;
    }
  },
};

refs.buttonStart.addEventListener('click', onStart);
const calendar = flatpickr(refs.input, options);

function onStart() {
  refs.intervalId = setInterval(getTimerTime, 1000);
}

function getTimerTime() {
  refs.buttonStart.disabled = true;
  const currentTime = Date.now();
  const startTime = refs.selectedDates[0].getTime();
  const deltaTime = startTime - currentTime;
  const time = convertMs(deltaTime);

  if (deltaTime < DELTA_DEAD_LINE) {
    clearInterval(refs.intervalId);
  }

  updateClockface(time);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
