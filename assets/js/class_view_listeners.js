// class_view_listeners.js
buttons = document.querySelectorAll("button");

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substring(idx + 6) + "@noctrl.edu";
	}
	return email;
}

// Once the DOM is loaded, retrieve the user's currently enrolled classes
document.addEventListener('DOMContentLoaded', e => {
	// Get classes from database
	fetch('http://127.0.0.1:3000/classes', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : getUserEmail(), "mode" : 'g'})
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			if(data.length > 0){
				// If there is data, remove the paragraph saying there are no classes
				// and create the table (only the header row)
				let noClassPar = document.querySelector("#classdiv p");
				let classDiv = noClassPar.parentElement;
				classDiv.removeChild(noClassPar);
				createClassTable();
			}
			// For each record of data retrieved, create a row in the table
			let resultCourses = [];
			for(let i=0; i<data.length; i++){
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
		})
		.catch(error => {
			console.log(error);
		});
});

// Create the result table with only the header row
function createClassTable(){
	let classTable = document.createElement("table");
	classTable.id = "class_table";
	//classTable.classList.add("table", "table-striped");
	
	let headerRow = document.createElement("tr");
	
	let headerId = document.createElement("th");
	headerId.innerHTML = "Code";
	let headerName = document.createElement("th");
	headerName.innerHTML = "Name";
	let headerDate = document.createElement("th");
	headerDate.innerHTML = "Date";
	let headerDow = document.createElement("th");
	headerDow.innerHTML = "Days of Week";
	let headerTime = document.createElement("th");
	headerTime.innerHTML = "Time";
	let headerLoc = document.createElement("th");
	headerLoc.innerHTML = "Location";
	let headerFaculty = document.createElement("th");
	headerFaculty.innerHTML = "Faculty";
	
	// Append table header data elements to the table header row
	headerRow.appendChild(headerId);
	headerRow.appendChild(headerName);
	headerRow.appendChild(headerDate);
	headerRow.appendChild(headerDow);
	headerRow.appendChild(headerTime);
	headerRow.appendChild(headerLoc);
	headerRow.appendChild(headerFaculty);
	
	// Append table header row to the table
	classTable.appendChild(headerRow);
	
	// Append table to the classdiv div
	let classDiv = document.getElementById("classdiv");
	classDiv.appendChild(classTable);
};


// Create a row in the course result table display the given information
function createClassTableRow(cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast){
	let classTable = document.getElementById("class_table");
	
	// Create the table row
	let dataRow = document.createElement("tr");
	
	// Create the table data for the given information
	let dataId = document.createElement("td");
	dataId.innerHTML = cid;
	let dataName = document.createElement("td");
	dataName.innerHTML = name;
	let dataDate = document.createElement("td");
	let semStartDate = new Date(startDate);
	semStartDate.setHours(0,0,0,0);
	let semEndDate = new Date(endDate);
	semEndDate.setHours(0,0,0,0);
	dataDate.innerHTML = semStartDate.toLocaleDateString() + " - " + semEndDate.toLocaleDateString();
	let dataDow = document.createElement("td");
	let dowList = dow.split(""); // list of characters 
	let dowLongObj = {
		"U" : "Sunday", 
		"M" : "Monday", 
		"T" : "Tuesday", 
		"W" : "Wednesday", 
		"R" : "Thursday",
		"F" : "Friday", 
		"S" : "Saturday"
	};
	let i=0;
	for(i=0; i<dowList.length; i++){
		// Replace each single-character day with the full-text day
		dowList[i] = dowLongObj[dowList[i]];
	}
	dataDow.innerHTML = dowList.join(", ");
	let dataTime = document.createElement("td");
	dataTime.innerHTML = startTime + " - " + endTime;
	let dataLoc = document.createElement("td");
	dataLoc.innerHTML = building + ", " + roomNum;
	let dataFaculty = document.createElement("td");
	dataFaculty.innerHTML = fnamelast + ", " + fnamefirst;
	
	let dropTd = document.createElement("td");
	dropTd.innerHTML = "Drop";
	// Change the cursor of this table element to a clickable cursor
	dropTd.classList.add("click-cursor");
	
	dropTd.addEventListener('click', e => {		
		//Request object has user's email, the course id they are removing, and mode: d for delete
		requestObj = {
			email: getUserEmail(),
			cid: cid,
			mode: 'd'
		};
		
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
				// Remove the corresponding row from the result table
				let courseTableRow = e.target.parentElement;
				let courseTable = courseTableRow.parentElement;
				courseTable.removeChild(courseTableRow);
				if(courseTable.children.length === 1){ // only tbody is left as a table child
					// Hide the result table
					courseTable.style.display = "none";
					// Add a paragraph saying you have no classes to the DOM
					let noClassP = document.createElement("p");
					noClassP.innerHTML = "You have no current classes";
					document.getElementById("classdiv").appendChild(noClassP);
				}
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	// Append table data elements to the table row
	dataRow.appendChild(dataId);
	dataRow.appendChild(dataName);
	dataRow.appendChild(dataDate);
	dataRow.appendChild(dataDow);
	dataRow.appendChild(dataTime);
	dataRow.appendChild(dataLoc);
	dataRow.appendChild(dataFaculty);
	dataRow.appendChild(dropTd);
	
	// Append table row to the table
	classTable.appendChild(dataRow);

};

// Add a second faculty member to a class in a certain row of the search results table
function addFacultyToRow(cid, fnamefirst, fnamelast){
	let classTable = document.querySelector("#classdiv table");
	let tableChildren = classTable.children; // children should be tbody and tr (we want tr)
	let i=0;
	// For each table row, see if the course id (located in the first td element) is the same
	// as the given cid. If it is, add the new faculty member to the faculty table data element
	for(i=0; i<tableChildren.length; i++){
		let cidTableTd = tableChildren[i].children[0]; // children are td
		if(cidTableTd.innerHTML === cid){
			let tableRowChildren = tableChildren[i].children;
			let addFaculty = "; " + fnamelast + ", " + fnamefirst;
			tableRowChildren[tableRowChildren.length-2].innerHTML += addFaculty;
		}
	}
};

//buttons[0] is "Logout" button
document.getElementById("logout").addEventListener('click', e => {window.location.href = 'login.html';});

//buttons[1] is "Back" button
buttons[1].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substring(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});

//buttons[2] is "Add" button
buttons[2].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substring(idx);
	}
	window.location.href = 'addclass.html' + user;
});
