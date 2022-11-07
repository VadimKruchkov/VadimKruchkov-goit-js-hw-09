import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const delayNumber = Number(delayEl.value);
  const stepNumber = Number(stepEl.value);
  const amountNumber = Number(amountEl.value);
  // console.log (delayNumber);
  // console.log (stepNumber);
  // console.log (amountNumber);

  for (let i = 1; i <= amountNumber; i += 1) {
    createPromise(i, delayNumber + stepNumber * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
