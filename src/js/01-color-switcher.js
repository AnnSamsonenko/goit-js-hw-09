const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

class Colorpicker {
  constructor() {
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = generateDarkColorHex();
    }, 1000);
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
  }

  stop() {
    clearInterval(this.intervalId);
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
  }
}

const colorPicker = new Colorpicker();

refs.buttonStart.addEventListener('click', colorPicker.start.bind(colorPicker));
refs.buttonStop.addEventListener('click', colorPicker.stop.bind(colorPicker));

function generateDarkColorHex() {
  let color = '#';
  for (let i = 0; i < 3; i++)
    color += ('0' + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
  return color;
}
