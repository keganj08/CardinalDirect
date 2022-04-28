// task_listeners.js

// Retrieve the To-Do list table from the DOM
const todoListTable = document.querySelector("#todolist table");

// Creates a to-do list
function createToDoList(){
	let requestObj = {"listDate" : getCurrentDate(), "email" : getUserEmail(), "mode" : 'a'}
	
	//Send request to server to add a new to-do list to to-do database
	fetch('http://127.0.0.1:3000/todo_lists', {
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
			// Set the todo list table id
			let id = data.id.substring(0, data.id.length);
			todoListTable.id="tid"+id;
			
			// Make sure the todo message div does not say Nothing To DO
			document.getElementById("todo-messages").innerHTML = "";
		})
		.catch(error => {
			console.log(error);
		});
}

// Deletes a to-do list
function deleteToDoList(){
	// For the id, substring to get rid of "tid"
	let requestObj = {"id" : todoListTable.id.substring(3), "mode" : 'd'}
	
	//Send request to server to remove a to-do list from to-do database
	fetch('http://127.0.0.1:3000/todo_lists', {
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
			todoListTable.id = "";
			
			// Make sure the todo message div does not say Nothing To DO
			document.getElementById("todo-messages").innerHTML = "Nothing To Do";
		})
		.catch(error => {
			console.log(error);
		});
}

// Event Handler for To-do list "Add" Button
document.querySelector("#todo-add-btn").addEventListener('click', e => {
	document.getElementById("newtodo").classList.remove("display-none"); // Show the new to-do item form
	e.target.parentNode.classList.add("display-none"); // Hide the add button
	if(todoListTable.children.length === 0){ //table is empty
		createToDoList();
	}
});

// Event Handler for To Do Form Submit
document.querySelector("#newtodo form").addEventListener('submit', e => {
	e.preventDefault(); // Prevents default form submit behavior
	let formElem = e.target;

	// save new to-do item to database
	
	// Get data from the form
	let formData = new FormData(formElem);
	let requestObj = Object.fromEntries(formData);
	
	// Check that the new entry is unique (i.e., that it is not already in the to-do list table)
	let isUnique = true;
	todoListTable.childNodes.forEach(row => {
		if(isUnique && row.childNodes[1].innerHTML === requestObj.description){
			isUnique = false;
		}
	});
	
	if(isUnique){ // Only add the to-do item to the database if it is unique
		// Substring to remove "tid" from the id
		requestObj.tid = todoListTable.id.substring(3);
		requestObj.isComplete = false;
		requestObj.mode = 'a';
		
		//Send request to server to add a new to-do item to to-do item database
		fetch('http://127.0.0.1:3000/todo_list_items', {
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
				// Reset and clear out the form's contents
				formElem.reset();
				
				formElem.parentNode.classList.add("display-none");; // Hide the new to-do item form
				document.querySelector("#todo-add-btn").parentNode.classList.remove("display-none"); //Show the add button
				addToDoListItem(requestObj.description, requestObj.isComplete); // add item to to-do list table
				calculateProgress(); // Update the progress bar
			})
			.catch(error => {
				console.log(error);
			});
	}
});




// Add to-do item to the to-do list
function addToDoListItem(description, isComplete){
	// Create the table row
	let todo_item = document.createElement("tr");
	
	// Create the table data for the given information
	let todo_isComplete = document.createElement("td");
	if(isComplete == true){	
		//todo_isComplete.classList.remove('circle-icon');
		todo_isComplete.classList.add('check-mark-icon');
	}
	else{
		todo_isComplete.classList.add('circle-icon');
	}
	// Change the cursor to a clickable cursor
	todo_isComplete.classList.add('click-cursor');
	
	// Event listener when click "Complete" 
	todo_isComplete.addEventListener('click', e => {
		// If the to-do item has a circle icon and is clicked, it should be marked as complete
		// and updated in the database. If the to-do item has a check-mark icon and is clicked,
		// it should be marked as incomplete and updated in the database
		let todoItemRow = e.target.parentNode;
		
		let requestObj = {
			"tid" : todoListTable.id.substring(3), //Remove "tid" from the id
			"description" : todoItemRow.childNodes[1].innerHTML,
			"isComplete" : todoItemRow.childNodes[0].classList.contains('circle-icon'),
			"mode" : 'u'
		};
		
		//Send request to server to update to-do list item in to-do list item database
		fetch('http://127.0.0.1:3000/todo_list_items', {
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
				// If the icon is the circle icon, make it a check mark.
				// If the icon is a check mark, make it a circle.
				e.target.classList.toggle('circle-icon');
				e.target.classList.toggle('check-mark-icon');
				
				// Update the progress bar
				calculateProgress();
			})
			.catch(error => {
				console.log(error);
			});
		
	});
	
	let todo_description = document.createElement("td");
	todo_description.innerHTML = description;
	
	let delTd = document.createElement("td");
	// Add the trash icon to the delete button and make the cursor clickable
	delTd.classList.add('trash-icon', 'click-cursor');
	// Event listener to delete to-do list item
	delTd.addEventListener('click', e => {
		let dataRow = e.target.parentNode;
		let dataVals = dataRow.children;
		let description = dataVals[1].innerHTML;
		let id = dataRow.parentNode.id.substring(3); //Remove "tid" from the id
		
		//Send request to server to delete an existing to-do item from to-do item database
		
		fetch('http://127.0.0.1:3000/todo_list_items', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"tid" : id, "description" : description, "mode" : 'd'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			})
			.then(data => {
				// Remove the corresponding row from the to-do list table
				let todoTable = dataRow.parentNode;
				todoTable.removeChild(dataRow);
				
				// Update the progress bar
				calculateProgress();
				
				if(todoTable.children.length === 0){ // table is empty
					deleteToDoList();
				}
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	// Append table data elements to the table row
	todo_item.appendChild(todo_isComplete);
	todo_item.appendChild(todo_description);
	todo_item.appendChild(delTd);

	
	// Append table row to the table
	todoListTable.appendChild(todo_item);
}

// Calculates the percent of to-do list items completed and updates the progress bar
function calculateProgress(){
	let todoTable = document.querySelector("#todolist table");
	let total = todoTable.children.length;
	let completeNum = 0;
	let i=0;
	for(i=0; i<total; i++){
		let todoRow = todoTable.children[i];
		// If the first table data entry of the row has a check mark icon,
		// add to the number of tasks that are complete.
		if(todoRow.children[0].classList.contains("check-mark-icon")){
			completeNum += 1;
		}
	}
	let progressBar = document.querySelector(".progress-bar");
	let percent = Math.floor(100 * completeNum / total);
	progressBar.style.width = "" + percent + "%";
	progressBar.innerHTML = "" + percent + "% Complete";
}
