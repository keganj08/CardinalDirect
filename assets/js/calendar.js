// calendar.js
var calendar = {
	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	/* month is 0-11 */
	month: new Date().getMonth(),
	/* four digit year */
	year: new Date().getFullYear(),
	/* Returns the current month of the calendar*/
	getMonth: function(){return this.month;},
	/* Returns the current year of the calendar*/
	getYear: function(){return this.year;},
	/* Populates the calendar with dates */
	initialize: function(){
		populateCalendar(this.months[this.month], this.month, this.year);
	},
	/* Increments month. If month is 11, month becomes 0 and year is incrmented. */
	incrementMonth: function(){
		this.year = this.year + Math.trunc((this.month + 1)/12)
		this.month = (this.month + 1) % 12;
		this.initialize();
	},
	/* Decrements month. If month is 0, month becomes 11 and year is decremented. */
	decrementMonth: function(){
		if(this.month === 0){
			this.month = 11;
			this.year -= 1;
		}
		else{
			this.month -= 1;
		}
		this.initialize();
	}
}

