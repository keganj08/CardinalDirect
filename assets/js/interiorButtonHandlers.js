//for use in interior page
//onclick event handler for toggle display for room #'s (button)
//TODO find a way to get current room numbers of img (element.attributes.rooms.value);, place the numbers in correct locations
//need a way to set current picture to an element id

document.getElementById("showRooms").onclick = function() {
    var roomLabels = document.getElementById("test")
    if (roomLabels.style.display === "none") {
        roomLabels.style.display = "block";
      } else {
        roomLabels.style.display = "none";
      }
}