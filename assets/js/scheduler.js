var calendar = {
	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	month: new Date().getMonth(),
	year: new Date().getFullYear(),
	populate: function(){
		document.getElementById("calendarmonth").innerHTML = this.months[this.month] + " " + this.year;
		let firstDateOfMonth = new Date(this.year, this.month, 0);
		let firstDayOfMonth = firstDateOfMonth.getDay();
		let tableVals = document.getElementsByTagName("td");
		let numDaysInMonth = new Date(this.year, this.month+1, 0).getDate();
		let i=firstDayOfMonth;
		let ctr;
		for (ctr = 1; ctr<numDaysInMonth+1; ctr++){
			tableVals[firstDayOfMonth + ctr].innerHTML = ctr;
		}
	},
}
calendar.populate();