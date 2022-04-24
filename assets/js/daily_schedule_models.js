// daily_schedule_models.js

var courseIds = {
	// List of full course cids, which include section number and semester
	cids: [],
	// List of simple course cids, which only have the course code and name
	simpleCids: [],
	// Add cid and its simple version to the respective course list
	addCourse: function(cid){
		this.cids.push(cid);
		this.simpleCids.push(cid.split("*", 2).join(' '));
	},
	// Returns the list of full course ids
	getCids: function(){return this.cids;},
	// Returns the list of simple course ids
	getSimpleCids: function(){return this.simpleCids;},
	// Returns the full course id corresponding to the given simple course id
	getCidFromSimple: function(simpleCid){
		let idx = this.simpleCids.indexOf(simpleCid);
		let cid = null;
		if(idx !== -1){
			cid = this.cids[idx];
		}
		return cid;
	},
	// Returns the simple course id corresponding to the given full course id
	getSimpleFromCid: function(cid){
		let idx = this.cids.indexOf(cid);
		let simpleCid = null;
		if(idx !== -1){
			simpleCid = this.simpleCids[idx];
		}
		return simpleCid;
	},
	// Returns the index of the given full course id in the list of full course ids
	getCidIdx: function(cid){return this.cids.indexOf(cid);},
	// Returns the index of the given simple course id in the list of simple course ids
	getSimpleIdx: function(simpleCid){return this.simpleCids.indexOf(simpleCid);}
};

var events = {
	// Contains the ids of each event
	eventIds: [],
	// Contains the start time of each event
	startTimes: [],
	// Contains the end time of each event
	endTimes: [],
	// Adds the given event id, start time, and end time to the respective list
	// Returns the index at which the event belongs to maintain chronological order
	addEventTimes: function(id, startStr, endStr){
		// Convert the start and end times, currently in 12-hr AM/PM format, into 24-hr format
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
	// Convert the given time, currently in 12-hr AM/PM format, into 24-hr format
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

var assignments = {
	// Contains the ids of each assignment
	assignmentIds: [],
	// Contains the due time of each assignment
	dueTimes: [],
	// Adds the given assignment id and due time to the respective list.
	// Returns the index at which the assignment belongs with respect to the chronological 
	// order of due times.
	addDueTime: function(id, dueTimeStr){
		// Convert the due time, currently in 12-hr AM/PM format, into 24-hr format.
		let dueTime = this.getFormattedDateStringFromAmPM(dueTimeStr);
		// Find the index at which the assignment belongs in chronological order.
		let foundloc = false;
		let idx = 0;
		if(this.dueTimes.length > 0){
			// Keep searching for the idx to insert in chronological order as long as
			// the current due time is less than or equal to the given due time.
			while(this.dueTimes[idx] <= dueTime){
				idx += 1;	
			}
		}
		// Insert the assignment's id and due time to the respective lists.
		this.dueTimes.splice(idx, 0, dueTime);
		this.assignmentIds.splice(idx, 0, id);
		return idx;
	},
	// Updates the due time of an assignment already in the lists
	updateDueTime: function(id, newDueTimeStr){
		let idx = this.assignmentIds.indexOf(id);
		this.removeDueTime(id);
		idx = this.addDueTime(id, newDueTimeStr);
		return idx;
	},
	// Deletes the due time of an assignment already in the lists
	removeDueTime: function(id){
		let delidx = this.assignmentIds.indexOf(id);
		this.assignmentIds.splice(delidx, 1);
		this.dueTimes.splice(delidx, 1);
	},
	// Convert the given time, currently in 12-hr AM/PM format, into 24-hr format
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
	// Print the list conents of each list
	print: function(){
		let i=0;
		for(i=0; i<this.dueTimes.length; i++){
			console.log(this.assignmentIds[i] + " " + this.dueTimes[i]);
		}
	}
};
