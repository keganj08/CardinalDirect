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

/* Not Fully Operational Yet
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
				let classDiv = document.getElementById("classdiv");
				let classDivChildren = classDiv.childNodes;
				classDiv.removeChild(classDivChildren[0]);
				createClassTable();
				let i=0;
				for(i=0; i<data.length; i++){
					createClassElement(data[i].cid, data[i].name, data[i].startDate, data[i].endDate, data[i].dow, data[i].startTime, data[i].endTime, data[i].building, data[i].roomNum, data[i].fnamefirst, data[i].fnamelast);
				}
			}
			
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
	headerDate.innerHTML = "Days of Week";
	let headerTime = document.createElement("th");
	headerTime.innerHTML = "Time";
	let headerLocation = document.createElement("th");
	headerLocation.innerHTML = "Location";
	let headerFaculty = document.createElement("th");
	headerFaculty.innerHTML = "faculty";

function createClassElement(id, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast){
	
};
*/

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
