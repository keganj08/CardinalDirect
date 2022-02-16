// scheduler_listeners.js

/* Next button on calendar increments the month */
document.querySelector("#right_cal_button").addEventListener('click', e => {
	calendar.incrementMonth();
});

/* Prev button on calendar decrements the month */
document.querySelector("#left_cal_button").addEventListener('click', e => {
	calendar.decrementMonth();
});