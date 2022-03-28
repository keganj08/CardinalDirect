// class_view_listeners.js
buttons = document.querySelectorAll("button");

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	return email;
}

// Not Fully Operational Yet
document.addEventListener('DOMContentLoaded', e => {
	// Get classes from database
	console.log("In Event Listener");
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
				let noClassPar = document.querySelector("#classdiv p");
				let classDiv = noClassPar.parentElement;
				classDiv.removeChild(noClassPar);
				createClassTable();
			}
			data.forEach((element)=>{
				console.log(element);
				createClassTableRow(element.cid, element.name, element.startDate, element.endDate, element.dow, element.startTime, element.endTime, element.building, element.roomNum, element.fnamefirst, element.fnamelast);
			});
		})
		.catch(error => {
			console.log(error);
		});
});


function createClassTable(){
	let classTable = document.createElement("table");
	classTable.id = "class_table";
	
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
	
	// Append table data elements to the table row
	headerRow.appendChild(headerId);
	headerRow.appendChild(headerName);
	headerRow.appendChild(headerDate);
	headerRow.appendChild(headerDow);
	headerRow.appendChild(headerTime);
	headerRow.appendChild(headerLoc);
	headerRow.appendChild(headerFaculty);
	
	// Append table row to the table
	classTable.appendChild(headerRow);
	
	// Append table to the classdiv div
	let classDiv = document.getElementById("classdiv");
	classDiv.appendChild(classTable);
};


// STILL NEED TO HANDLE MULTIPLE FACULTY MEMBERS & ADJUST HOW DATA APPEAR IN TABLE (ESP. DATES)
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
	dataDate.innerHTML = startDate.substr(0,10) + "-" + endDate.substr(0,10);
	let dataDow = document.createElement("td");
	dataDow.innerHTML = dow;
	let dataTime = document.createElement("td");
	dataTime.innerHTML = startTime + "-" + endTime;
	let dataLoc = document.createElement("td");
	dataLoc.innerHTML = building + ", " + roomNum;
	let dataFaculty = document.createElement("td");
	dataFaculty.innerHTML = fnamefirst + ", " + fnamelast;
	
	let dropTd = document.createElement("td");
	dropTd.innerHTML = "Drop";
	
	dropTd.addEventListener('click', e => {
		//console.log("Click - Drop Class Button");
		
		//Delete Enroll record from database
		requestObj = {
			email: getUserEmail(),
			cid: cid,
			mode: 'd'
		};
		console.log(requestObj);
		
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
				let courseTableRow = e.target.parentElement;
				let courseTable = courseTableRow.parentElement;
				courseTable.removeChild(courseTableRow);
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


//buttons[0] is "Back" button
buttons[0].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});

//buttons[1] is "Add" button
buttons[1].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'addclass.html' + user;
});
