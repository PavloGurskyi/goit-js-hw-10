import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconOk from '../img/svg/ok.svg';
import iconError from '../img/svg/error.svg';

const formEl = document.querySelector('.js-form');

const promise = {
  createPromise: ({ delay, state }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  },

  fulfilled: value =>
    iziToast.show({
      iconUrl: iconOk,
      title: 'OK',
      message: `Fulfilled promise in ${value}ms`,
      position: 'topRight',
      backgroundColor: '#59a10d',
      theme: 'dark',
    }),

  rejected: value =>
    iziToast.show({
      iconUrl: iconError,
      title: 'Error',
      message: `Rejected promise in ${value}ms`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      theme: 'dark',
    }),
};

const onFormSubmit = event => {
  event.preventDefault();

  const {
    delay: { value: delayInput },
    state: { value: state },
  } = formEl.elements;

  const delay = Number(delayInput.trim());

  if (isNaN(delay) || delay < 0) {
    iziToast.show({
      iconUrl: iconError,
      title: 'Error',
      message: 'Please enter a valid non-negative number for delay.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      theme: 'dark',
    });
    return;
  }

  promise
    .createPromise({ delay, state })
    .then(promise.fulfilled)
    .catch(promise.rejected);

  formEl.reset();
};

formEl.addEventListener('submit', onFormSubmit);
