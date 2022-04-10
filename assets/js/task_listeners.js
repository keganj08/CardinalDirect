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
			let id = data.id.substring(0, data.id.length);
			todoListTable.id=id;
		})
		.catch(error => {
			console.log(error);
		});
};

// Deletes a to-do list
function deleteToDoList(){
	let requestObj = {"id" : todoListTable.id, "mode" : 'd'}
	
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
			todoListTable.id = "";
		})
		.catch(error => {
			console.log(error);
		});
};

// Event Handler for To-do list "Add" Button
document.querySelector("#todolist button").addEventListener('click', e => {
	document.getElementById("newtodo").style.display = "block";
	console.log("in todo list add");
	console.log(todoListTable.children);
	if(todoListTable.children.length === 0){//only tbody in table, no rows
		createToDoList();
	}
	//document.querySelector("#newtodo form").id = "new";
});

// Event Handler for To Do Form Submit
document.querySelector("#newtodo form").addEventListener('submit', e => {
	console.log("Submit To Do Form");
	e.preventDefault();
	let formElem = e.target;

	console.log("To-Do Item Form Submit");
	// save new to-do item to database
	let formData = new FormData(formElem);
	let requestObj = Object.fromEntries(formData);
	requestObj.tid = todoListTable.id;
	requestObj.isComplete = false;
	requestObj.mode = 'a';
	
	console.log(requestObj);
	
	//Send request to server to add a new assignment to assignment database
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
			formElem.parentNode.style.display = "none";
			//document.getElementById("todolist").style.display = "block";
			addToDoListItem(requestObj.description, requestObj.isComplete);
		})
		.catch(error => {
			console.log(error);
		});
});




// Add to-do item to the to-do list
function addToDoListItem(description, isComplete){
	// Create the table row
	let todo_item = document.createElement("tr");
	//dataRow.id = tid;
	
	// Create the table data for the given information
	let todo_description = document.createElement("td");
	todo_description.innerHTML = description;
	let todo_isComplete = document.createElement("td");
	if(isComplete == true){	
		todo_isComplete.innerHTML = "Done";
	}
	else{
		todo_isComplete.innerHTML = "Complete";
	}
	
	// Event listener when click "Complete" 
	todo_isComplete.addEventListener('click', e => {
		console.log("Update Completeness of To Do List Item");
		
		let requestObj = {
			"tid" : todoListTable.id,
			"description" : e.target.parentNode.childNodes[0].innerHTML,
			"isComplete" : true,
			"mode" : 'u'
		};
		
		console.log(requestObj);
		
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
				e.target.innerHTML = "Completed";
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	let delTd = document.createElement("td");
	delTd.innerHTML = "Delete";
	// Event listener to delete to-do list item
	delTd.addEventListener('click', e => {
		console.log("Delete ToDo Item - Click");
		let dataRow = e.target.parentNode;
		let dataVals = dataRow.children;
		let description = dataVals[0].innerHTML;
		let id = dataRow.parentNode.id;
		
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
				console.log(data.success);
				// Remove the corresponding row from the to-do list table
				let todoTable = dataRow.parentNode;
				todoTable.removeChild(dataRow);
				
				if(todoTable.children.length === 0){ // table is empty
					// Hide the to-do list table
					//todoTable.parentNode.style.display = "none";
					deleteToDoList();
				
					
					/* May Need to Convert and Use
					// Add a paragraph saying you have no classes to the DOM
					let noClassP = document.createElement("p");
					noClassP.innerHTML = "You have no current classes";
					document.getElementById("classdiv").appendChild(noClassP);
					*/
				}
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	// Append table data elements to the table row
	todo_item.appendChild(todo_description);
	todo_item.appendChild(todo_isComplete);
	todo_item.appendChild(delTd);

	
	// Append table row to the table
	todoListTable.appendChild(todo_item);
};


/*
(function(){
  
  var list = document.querySelector('#list'),
      form = document.querySelector('form'),
      item = document.querySelector('#item');
  
  form.addEventListener('submit',function(e){
    e.preventDefault();
    list.innerHTML += '<li>' + item.value + '</li>';
    store();
    item.value = "";
  },false)
  
  list.addEventListener('click',function(e){
    var t = e.target;
    if(t.classList.contains('checked')){
      t.parentNode.removeChild(t);
    } else {
      t.classList.add('checked');
    }
    store();
  },false)
  
  function store() {
    //window.localStorage.myitems = list.innerHTML;
  }
  
  function getValues() {
	var storedValues = false;
    //var storedValues = window.localStorage.myitems;
    if(!storedValues) {
      list.innerHTML = ""
    }
    else {
      list.innerHTML = storedValues;
    }
  }
  getValues();
})();
*/
