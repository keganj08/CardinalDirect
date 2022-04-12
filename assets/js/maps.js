/* To-do:
	- Drop-down menu for campus locations
	- Step by step directions
*/

let method = "WALKING";

document.getElementById("walkToggle").addEventListener("click", function(){
	let methods = document.getElementById("mapUiUpper").children;
	for (let i=0; i<methods.length; i++){
		methods[i].classList.remove("methodToggleSelected");
	}
	document.getElementById("walkToggle").classList.add("methodToggleSelected");
	method = "WALKING";
	getCoords();
});

document.getElementById("driveToggle").addEventListener("click", function(){
	let methods = document.getElementById("mapUiUpper").children;
	for (let i=0; i<methods.length; i++){
		methods[i].classList.remove("methodToggleSelected");
	}
	document.getElementById("driveToggle").classList.add("methodToggleSelected");
	method = "DRIVING";
	getCoords();
});

const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();

//Renders map centered on Old Main
function initMap() {

	var oldMain = new google.maps.LatLng(41.776230, -88.142891);
	  var mapOptions = {
		zoom:15,
		center: oldMain
	  }
	  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	  directionsRenderer.setMap(map);
}

//On button click, gets and renders route to given destination
document.getElementById("goBtn").addEventListener("click", function(){
	getCoords();
});

function getCoords(){
	let input = document.getElementById("locations").value;
	if(input){
		//Get the user's location and pass it into updateMap()
		navigator.geolocation.getCurrentPosition(position => {
			updateMap(position.coords, input);
			//const { latitude, longitude } = position.coords;
		});
	} else {
		alert("Input a destination.");
	}
}

//Finds and renders route to given destination
function updateMap(coords, end) {
	var start = new google.maps.LatLng(coords);
	//Query object to be sent as request
	var req = {
		origin: {lat: coords.latitude, lng: coords.longitude},
		destination: end,
		travelMode: method
	}

	//Server call to find route
	directionsService.route(
		// Query object
		req,
		// Callback function
		(response, status) => {
			if ( status == 'OK') {
				console.log(response);
				directionsRenderer.setDirections(response);
			} else {
				alert('response error');
			}
		}
	)
  	getTime(coords, end);
  	setInterval(function() {
    	getTime(coords, end)
	}, 15000);
}

initMap();

function getTime(coords, end) {
	let originCoords = coords.latitude + "," + coords.longitude;
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
		origins: [originCoords],
		destinations: [end],
		travelMode: method,
		/* Optional settings
		transitOptions: TransitOptions,
		drivingOptions: DrivingOptions,
		unitSystem: UnitSystem,
		avoidHighways: Boolean,
		avoidTolls: Boolean,
		*/
  	}, printTime);
}

function printTime(response, status) {
	let eta = response.rows[0].elements[0].duration.text; //Isolate the time remaining string
	document.getElementById("eta").innerHTML = eta;
}


/*

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.772968, lng: -88.142471 },
    zoom: 7,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");


  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

*/