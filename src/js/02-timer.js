import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectDate;

buttonStart.setAttribute('disabled', ' ');
buttonStart.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: Date.now(),
  onClose(selectedDates) {
    if (Date.now() >= selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.setAttribute('disabled', ' ');
      return;
    }
    buttonStart.removeAttribute('disabled');
    selectDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};
flatpickr(inputEl, options);

function startTimer() {
  Notiflix.Notify.success('ПОЧАЛИ');
  buttonStart.setAttribute('disabled', ' ');
  inputEl.setAttribute('disabled', ' ');

  let timerId = setInterval(() => {
    const time = selectDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(time);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
      buttonStart.removeAttribute('disabled');
      inputEl.removeAttribute('disabled');
      Notiflix.Notify.success('ЗАВЕРШЕНО!!!');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
