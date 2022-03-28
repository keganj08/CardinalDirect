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
			data.forEach((element)=>{
				console.log(element);
				courses.push(element.cid);
			});
			
		})
		.catch(error => {
			console.log(error);
		});
});



document.getElementById("class-search").addEventListener("submit", e => {
	e.preventDefault();
	let classTableSection = document.getElementById("result_section");
	let classTable = classTableSection.children[0];
	let i=0;
	console.log(classTable.children);
	let length = classTable.children.length;
	for(i=1; i<length; i++){
		classTable.removeChild(classTable.children[1]);
	}
	classTableSection.style.display = "none";
	
	let formElem = e.target;
	
	let formData = new FormData(formElem);
	let formObj = Object.fromEntries(formData);
	requestObj = {
		"searchParams" : formObj, //JSON.stringify(formObj),
		"mode" : 's'
	};
	console.log(requestObj);
		
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
			for(let i=0; i<data.length; i++){
				console.log(data[i]);
				rec = data[i];
				createClassTableRow(rec.cid, rec.name, rec.startDate, rec.endDate, rec.dow, rec.startTime, rec.endTime, rec.building, rec.roomNum, rec.fnamefirst, rec.fnamelast);
			}
		})
		.catch(error => {
			console.log(error);
		});
		
});


// STILL NEED TO HANDLE MULTIPLE FACULTY MEMBERS & ADJUST HOW DATA APPEAR IN TABLE (ESP. DATES)
function createClassTableRow(cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast){
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
	
	addTd.addEventListener('click', e => {
		if(addTd.innerHTML === "Drop"){
			
			console.log("Click - Drop Class Button");
			
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
			
			//Add Enroll record to database
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

