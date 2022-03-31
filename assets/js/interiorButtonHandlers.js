//for use in interior page
//onclick event handler for toggle display for room #'s (button)
//TODO find a way to get current room numbers of img (element.attributes.rooms.value);, place the numbers in correct locations
//need a way to set current picture to an element id

/*document.getElementById("showRooms").onclick = function() {
    var roomLabels = document.getElementById("test")
    if (roomLabels.style.display === "none") {
        roomLabels.style.display = "block";
      } else {
        roomLabels.style.display = "none";
      }
}*/

document.getElementById("forwardBtn").onclick = function() {
  if(curr.attributes.forward.value == "true"){
    pic.src = curr.attributes.forwardImg.value;
    //set curr somehow to forward pic var
    //curr = window["SE_east"]; //this works!
    curr = window[curr.attributes.forwardVar.value]; //sets curr to pic it changes to
    console.log("test----  " +curr.attributes.test.value);
    console.log("bw----  " +curr.attributes.backward.value);

    //TODO change room # display
    //etc
  }
}

document.getElementById("leftBtn").onclick = function() {
  console.log("in left");
  if(curr.attributes.left.value == "true"){
    pic.src = curr.attributes.leftImg.value;
    curr = window[curr.attributes.leftVar.value];
  }
}

document.getElementById("rightBtn").onclick = function() {
  console.log("in right");
  if(curr.attributes.right.value == "true"){
    pic.src = curr.attributes.rightImg.value;
    curr = window[curr.attributes.rightVar.value];
  }
}

document.getElementById("backwardBtn").onclick = function() {
  if(curr.attributes.backward.value == "true"){
    pic.src = curr.attributes.backwardImg.value;
    curr = window[curr.attributes.backwardVar.value];
  }
}




