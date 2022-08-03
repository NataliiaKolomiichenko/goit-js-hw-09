import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateInputEl: document.querySelector('#datetime-picker'),
    startBtnEl: document.querySelector('[data-start]'),
    daysValueEl: document.querySelector('[data-days]'),
    hoursValueEl: document.querySelector('[data-hours]'),
    minutesValueEl: document.querySelector('[data-minutes]'),
    secondsValueEl: document.querySelector('[data-seconds]'),
};

let choosingDate = null;
let deltaTime = null;
refs.startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      choosingDate = selectedDates[0];
      if (choosingDate < options.defaultDate) {
        return Notify.failure("Please choose a date in the future")
    } else {
            refs.startBtnEl.disabled = false;            
        }
},
};

const timer = {
            intervalId: null,
            start() {
                this.intervalId = setInterval(() => {
                    deltaTime = choosingDate - Date.now();
                    if (deltaTime < 0) {
                        return this.stop()
                    }
                    const time = convertMs(deltaTime);
                    updateTimerValues (time)
                }, 1000);
            },
            stop() {
            clearInterval(this.intervalId);
            },
                }
            
refs.startBtnEl.addEventListener('click', () => {
    timer.start();
    refs.dateInputEl.disabled = true;
    refs.startBtnEl.disabled = true;
})

flatpickr(refs.dateInputEl, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};

function updateTimerValues({ days, hours, minutes, seconds }) {
    refs.daysValueEl.textContent = days;
    refs.hoursValueEl.textContent = hours;
    refs.minutesValueEl.textContent = minutes;
    refs.secondsValueEl.textContent = seconds;
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
};
