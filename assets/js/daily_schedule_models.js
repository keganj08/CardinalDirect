// daily_schedule_models.js

var courseIds = {
	cids: [],
	simpleCids: [],
	addCourse: function(cid){
		this.cids.push(cid);
		this.simpleCids.push(cid.split("*", 2).join(' '));
	},
	getCids: function(){return this.cids;},
	getSimpleCids: function(){return this.simpleCids;},
	getCidFromSimple: function(simpleCid){
		let idx = this.simpleCids.indexOf(simpleCid);
		let cid = null;
		if(idx !== -1){
			cid = this.cids[idx];
		}
		return cid;
	},
	getSimpleFromCid: function(cid){
		let idx = this.cids.indexOf(cid);
		let simpleCid = null;
		if(idx !== -1){
			simpleCid = this.simpleCids[idx];
		}
		return simpleCid;
	},
	getCidIdx: function(cid){return this.cids.indexOf(cid);},
	getSimpleIdx: function(simpleCid){return this.simpleCids.indexOf(simpleCid);}
};

var events = {
	// Contains the ids of each event
	eventIds: [],
	// Contains the start time of each event
	startTimes: [],
	// Contains the end time of each event
	endTimes: [],
	// Adds the given event id, start time, and end time to the respective listStyleType
	// Returns the index at which the event belongs to maintain chronological order
	addEventTimes: function(id, startStr, endStr){
		// Convert the start and end times, currently in 12-hr AM/PM format into 24-hr format
		let start = this.getFormattedDateStringFromAmPM(startStr);
		let end = this.getFormattedDateStringFromAmPM(endStr);
		// Find the index at which the event belongs in chronological order
		let foundloc = false;
		let idx = 0;
		if(this.startTimes.length > 0){
			// Keep searching for the idx to insert in chronological order as long as
			// the current start time is less than the given start times or the current
			// start time is the same as the given start time and the current end time
			// is less than the given end time
			while((this.startTimes[idx] < start) || ((this.startTimes[idx] === start) && (this.endTimes[idx] < end))){
				idx += 1;	
			}
		}
		// Insert the event's id, start time, and end time to the respective lists
		this.startTimes.splice(idx, 0, start);
		this.endTimes.splice(idx, 0, end);
		this.eventIds.splice(idx, 0, id);
		return idx;
	},
	// Updates the start time and end time of an event already in the lists
	updateEventTimes: function(id, newStartStr, newEndStr){
		let idx = this.eventIds.indexOf(id);
		this.removeEventTimes(id);
		idx = this.addEventTimes(id, newStartStr, newEndStr);
		return idx;
	},
	// Deletes the start time and end time of an event already in the lists
	removeEventTimes: function(id){
		let delidx = this.eventIds.indexOf(id);
		this.eventIds.splice(delidx, 1);
		this.startTimes.splice(delidx, 1);
		this.endTimes.splice(delidx, 1);
	},
	// Convert the start and end times, currently in 12-hr AM/PM format into 24-hr format
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
	/* // Not Sure if Working Yet
	hasConflict: function(startDateTime, endDateTime){
		let i=0;
		let noConflict = true;
		while(noConflict && i<this.startTimes.length){
			if(((this.startTimes[i] < startDateTime) && (startDateTime < this.endTimes[i])) || ((this.startTimes[i] < endDateTime) && (endDateTime < this.endTimes[i]))){
				noConflict = false;
			}
			i += 1;
		}
		return noConflict;
	},
	*/
	// Print the list conents of each list
	print: function(){
		let i=0;
		for(i=0; i<this.startTimes.length; i++){
			console.log(this.eventIds[i] + " " + this.startTimes[i] + " " + this.endTimes[i]);
		}
	}
};
