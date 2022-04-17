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


var events = {
	eventIds: [],
	startTimes: [],
	endTimes: [],
	addEventTimes: function(id, startStr, endStr){
		let start = this.getFormattedDateStringFromAmPM(startStr);
		let end = this.getFormattedDateStringFromAmPM(endStr);
		let foundloc = false;
		let idx = 0;
		if(this.startTimes.length > 0){
			while(this.startTimes[idx] <= start){
				idx += 1;	
			}
		}
		this.startTimes.splice(idx, 0, start);
		this.endTimes.splice(idx, 0, end);
		this.eventIds.splice(idx, 0, id);
		return idx;
	},
	updateEventTimes: function(id, newStartStr, newEndStr){
		let idx = this.eventIds.indexOf(id);
		this.removeEventTimes(id);
		idx = this.addEventTimes(id, newStartStr, newEndStr);
		return idx;
	},
	removeEventTimes: function(id){
		let delidx = this.eventIds.indexOf(id);
		this.eventIds.splice(delidx, 1);
		this.startTimes.splice(delidx, 1);
		this.endTimes.splice(delidx, 1);
	},
	getFormattedDateStringFromAmPM: function(timeStr){
		let time_ampm = timeStr.split(" "); // 12:00 AM => [12:00, AM]
		let hr_min = time_ampm[0].split(":"); // 12:00 => [12, 00]
		let hr = parseInt(hr_min[0])%12; // Converts hour to int, then mods by 12 to change 12 to 0
		if(time_ampm[1] === "PM"){
			hr += 12;
		}
		hr = ("0" + hr).slice(-2);
		return hr + ":" + hr_min[1];
	},
	clear: function(){
		this.eventIds = [];
		this.startTimes = [];
		this.endTimes = [];
	},
	print: function(){
		let i=0;
		for(i=0; i<this.startTimes.length; i++){
			console.log(this.eventIds[i] + " " + this.startTimes[i] + " " + this.endTimes[i]);
		}
	}
};


