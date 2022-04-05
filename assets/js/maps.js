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
	let input = document.getElementById("destinationInput").value;
	if(input){
		//Get the user's location and pass it into updateMap()
		navigator.geolocation.getCurrentPosition(position => {
			updateMap(position.coords, input);
			//const { latitude, longitude } = position.coords;
		});
	} else {
		alert("Input a destination.");
	}
});

//Finds and renders route to given destination
function updateMap(coords, end) {
	var start = new google.maps.LatLng(coords);
	//Query object to be sent as request
	var req = {
		origin: {lat: coords.latitude, lng: coords.longitude},
		destination: end,
		travelMode: "DRIVING"
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
}

initMap();

//logout
document.getElementById("logout").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'login.html';
});

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