// addclass_listeners.js

var courses = [];

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	return email;
}

// Once the DOM is loaded, retrieve the user's currently enrolled classes
document.addEventListener('DOMContentLoaded', e => {
	// Get classes from database
	console.log("In Event Listener");
	fetch('http://127.0.0.1:3000/classes', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : getUserEmail(), "mode" : 'g'}) // mode: g for get classes
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			data.forEach((element)=>{
				console.log(element);
				// Add the course id to the courses array
				courses.push(element.cid);
			});
			
		})
		.catch(error => {
			console.log(error);
		});
});


// Event listener for submitting a search
document.getElementById("class-search").addEventListener("submit", e => {
	e.preventDefault();
	// Show the area that says "Results:" or "No Results"
	let hiddenElements = document.querySelectorAll(".result-area");
	hiddenElements[0].style.display = "block";
	
	// Clear out any previous search results
	let classTableSection = document.getElementById("result_section");
	let classTable = classTableSection.children[0];
	let i=0;
	let length = classTable.children.length;
	// Starting at 1 (to keep the header row), clear out all the search results
	for(i=1; i<length; i++){
		classTable.removeChild(classTable.children[1]);
	}
	classTableSection.style.display = "none";
	
	// Retrieve the contents of the form elements
	let formElem = e.target;
	let formData = new FormData(formElem);
	let formObj = Object.fromEntries(formData);
	
	// Set up the request object with the form information and mode: s for search
	requestObj = {
		"searchParams" : formObj,
		"mode" : 's'
	};
	//console.log(requestObj);
		
	//Send request to server to search course database
	fetch('http://127.0.0.1:3000/classes', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(requestObj)
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			// If there are search results
			if(data.length > 0){
				document.querySelector("h3").innerHTML = "Results:";
				let resultCourses = [];
				for(let i=0; i<data.length; i++){
					console.log(data[i]);
					rec = data[i];
					// If a course id shows up more than once (i.e., it's already in resultCourses),
					// add the faculty member's name to that row in the table. This handles
					// team teaching
					if(resultCourses.includes(rec.cid)){
						addFacultyToRow(rec.cid, rec.fnamefirst, rec.fnamelast);
					}
					// If a course id is not already in resultCourses, add it and add a row to the table
					else{
						resultCourses.push(rec.cid);
						createClassTableRow(rec.cid, rec.name, rec.startDate, rec.endDate, rec.dow, rec.startTime, rec.endTime, rec.building, rec.roomNum, rec.fnamefirst, rec.fnamelast);
					}
				}
			}
			else{ // The search came back with no results
				document.querySelector("h3").innerHTML = "No Results";
			}
		})
		.catch(error => {
			console.log(error);
		});
		
});


// STILL NEED TO ADJUST HOW DATA APPEAR IN TABLE (ESP. DATES)
function createClassTableRow(cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast){
	// Retrieve the table from the DOM
	let classTableSection = document.getElementById("result_section");
	let classTable = classTableSection.children[0];
	
	// Create the table row
	let dataRow = document.createElement("tr");
	
	// Create the table data for the given information
	let dataId = document.createElement("td");
	dataId.innerHTML = cid;
	let dataName = document.createElement("td");
	dataName.innerHTML = name;
	let dataDate = document.createElement("td");
	dataDate.innerHTML = startDate.substr(0,10) + "-" + endDate.substr(0,10);
	let dataDow = document.createElement("td");
	dataDow.innerHTML = dow;
	let dataTime = document.createElement("td");
	dataTime.innerHTML = startTime + "-" + endTime;
	let dataLoc = document.createElement("td");
	dataLoc.innerHTML = building + ", " + roomNum;
	let dataFaculty = document.createElement("td");
	dataFaculty.innerHTML = fnamefirst + ", " + fnamelast;
	
	let addTd = document.createElement("td");
	if(courses.includes(cid)){
		addTd.innerHTML = "Drop";
	}
	else{
		addTd.innerHTML = "Add";
	}
	
	// Event listener to add or drop a class
	addTd.addEventListener('click', e => {
		if(addTd.innerHTML === "Drop"){
			
			console.log("Click - Drop Class Button");
			
			//Request object has user's email, the course id they are removing, and mode: d for delete
			requestObj = {
				email: getUserEmail(),
				cid: cid,
				mode: 'd'
			};
			//console.log(requestObj);
			
			//Send request to server to delete an enroll record from enroll database
			fetch('http://127.0.0.1:3000/classes', {
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify(requestObj)
				})
				.then(response => {
					if (!response.ok){
						throw new Error('HTTP error: ${response.status}');
					}
					return response.json();
				})
				.then(data => {
					console.log(data);
					// Since it is removed from enroll, it can now be added again
					addTd.innerHTML = "Add"
					// Remove the cid from courses
					courses.splice(courses.indexOf(cid), 1);
				})
				.catch(error => {
					console.log(error);
				});
		}
		else{
			console.log("Click - Add Class Button");
			
			//Request object has user's email, the course id they are removing, and mode: a for add
			requestObj = {
				email: getUserEmail(),
				cid: cid,
				mode: 'a'
			};
			console.log(requestObj);
			
			//Send request to server to add a new enroll record to enroll database
			fetch('http://127.0.0.1:3000/classes', {
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify(requestObj)
				})
				.then(response => {
					if (!response.ok){
						throw new Error('HTTP error: ${response.status}');
					}
					return response.json();
				})
				.then(data => {
					console.log(data);
					// Since it is added to enroll, it can now be dropped again
					addTd.innerHTML = "Drop"
					// Add the cid to courses
					courses.push(cid);
				})
				.catch(error => {
					console.log(error);
				});
		}
		
	});
	
	// Append table data elements to the table row
	dataRow.appendChild(dataId);
	dataRow.appendChild(dataName);
	dataRow.appendChild(dataDate);
	dataRow.appendChild(dataDow);
	dataRow.appendChild(dataTime);
	dataRow.appendChild(dataLoc);
	dataRow.appendChild(dataFaculty);
	dataRow.appendChild(addTd);
	
	// Append table row to the table
	classTable.appendChild(dataRow);
	
	// Make the table visible
	classTableSection.style.display = "block";

};

// Add a second faculty member to a class in a certain row of the search results table
function addFacultyToRow(cid, fnamefirst, fnamelast){
	let classTable = document.querySelector("#result_section table");
	let tableChildren = classTable.children; // children should be tbody and tr (we want tr)
	let i=0;
	// For each table row, see if the course id (located in the first td element) is the same
	// as the given cid. If it is, add the new faculty member to the faculty table data element
	for(i=0; i<tableChildren.length; i++){
		let cidTableTd = tableChildren[i].children[0]; // children are td
		if(cidTableTd.innerHTML === cid){
			let tableRowChildren = tableChildren[i].children;
			let addFaculty = ", " + fnamefirst + ", " + fnamelast;
			tableRowChildren[tableRowChildren.length-2].innerHTML += addFaculty;
		}
	}
};


//"Back" button
document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'class_view.html' + user;
});

