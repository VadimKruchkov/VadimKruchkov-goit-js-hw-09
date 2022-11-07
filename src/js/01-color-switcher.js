const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

buttonStart.addEventListener('click', startChangeColor);
buttonStop.addEventListener('click', stopChangeColor);
let timerId = null;

function startChangeColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.setAttribute('disabled', ' ');
  buttonStop.removeAttribute('disabled');
}

function stopChangeColor() {
  clearInterval(timerId);
  buttonStop.setAttribute('disabled', ' ');
  buttonStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
