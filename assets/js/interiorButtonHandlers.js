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

//forward button
document.getElementById("forwardBtn").onclick = function() {
  if(curr.hasAttribute("forwardVar")){
    //set image to corresponding image based on clicked directional
    pic.src = curr.attributes.forwardImg.value;
    //set current pic
    //curr = window["SE_east"]; //this works!
    curr = window[curr.attributes.forwardVar.value]; //sets curr to pic it changes to
 
    //change room # display
    document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
    document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; 
  }
}

//left button
document.getElementById("leftBtn").onclick = function() {
  if(curr.hasAttribute("leftVar")){
    pic.src = curr.attributes.leftImg.value;
    curr = window[curr.attributes.leftVar.value];
    //change room # display
    document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
    document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; 
  }
}

//right button
document.getElementById("rightBtn").onclick = function() {
  if(curr.hasAttribute("rightVar")){
    pic.src = curr.attributes.rightImg.value;
    curr = window[curr.attributes.rightVar.value];
    //change room # display
    document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
    document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; 
  }
}

//backward button
document.getElementById("backwardBtn").onclick = function() {
  if(curr.hasAttribute("backwardVar")){
    pic.src = curr.attributes.backwardImg.value;
    curr = window[curr.attributes.backwardVar.value];
    //change room # display
    document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
    document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; 
  }
}

//downstairs button
document.getElementById("down").onclick = function() {
  if(curr.hasAttribute("downVar")){
    pic.src = curr.attributes.downImg.value;
    curr = window[curr.attributes.downVar.value];
    //change room # display
    document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
    document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; 
  }  
}

//upstairs button
document.getElementById("up").onclick = function() {
  if(curr.hasAttribute("upVar")){
    pic.src = curr.attributes.upImg.value;
    curr = window[curr.attributes.upVar.value];
    //change room # display
    document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
    document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; 
  }  
}

//secondary click handler for button style changing -- for every directional button
var buttons = document.querySelectorAll(".button").length;
for (var i = 0; i < buttons ; i++) {
    document.querySelectorAll(".button")[i].addEventListener("click", function() {
        //alert("Button Clicked");
        //hasattribute - directionals - if doesnt, change css to grey out
    if(!curr.hasAttribute("forwardVar")){
      document.getElementById("forwardBtn").style = "opacity: 0.1" 
    }
    else{
      document.getElementById("forwardBtn").style = "opacity: 1" 
    }
    if(!curr.hasAttribute("leftVar")){
      document.getElementById("leftBtn").style = "opacity: 0.1" 
    }
    else{
      document.getElementById("leftBtn").style = "opacity: 1" 
    }
    if(!curr.hasAttribute("rightVar")){
      document.getElementById("rightBtn").style = "opacity: 0.1" 
    }
    else{
      document.getElementById("rightBtn").style = "opacity: 1" 
    }
    if(!curr.hasAttribute("backwardVar")){
      document.getElementById("backwardBtn").style = "opacity: 0.1" 
    }
    else{
      document.getElementById("backwardBtn").style = "opacity: 1" 
    }
    if(!curr.hasAttribute("upVar")){
      document.getElementById("up").style = "opacity: 0.1" 
    }
    else{
      document.getElementById("up").style = "opacity: 1" 
    }
    if(!curr.hasAttribute("downVar")){
      document.getElementById("down").style = "opacity: 0.1" 
    }
    else{
      document.getElementById("down").style = "opacity: 1" 
    }
    });
  }






