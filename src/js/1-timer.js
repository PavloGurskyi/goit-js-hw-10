import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/svg/error.svg';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtnEl.setAttribute('disabled', 'true');
let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startBtnEl.setAttribute('disabled', 'true');
      iziToast.show({
        iconUrl: iconError,
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        theme: 'dark',
        timeout: 7000,
      });
    } else {
      startBtnEl.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputEl, options);

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => String(value).padStart(2, '0');

const updateTimeInfo = ({ days, hours, minutes, seconds }) => {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
};

const startTimer = () => {
  inputEl.setAttribute('disabled', 'true');
  startBtnEl.setAttribute('disabled', 'true');

  timerId = setInterval(() => {
    const timeDifference = userSelectedDate - Date.now();

    if (timeDifference <= 0) {
      clearInterval(timerId);
      updateTimeInfo({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      inputEl.removeAttribute('disabled');
      startBtnEl.removeAttribute('disabled');
      return;
    }

    const timeElements = convertMs(timeDifference);
    updateTimeInfo(timeElements);
  }, 1000);
};

startBtnEl.addEventListener('click', startTimer);
