
var curr;
var pic = document.getElementById("current"); //html element
console.log(pic.src);
//pic.src = 'assets/images/building interiors/floor1/sw_intersection/east.jpg';

//grab entrance from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
var entrance = params.entrance;
console.log("entrance= " + entrance);

//if NW, curr = NW_e
if(entrance == 'nw'){
    pic.src = F1_NW_east.src;
    curr = F1_NW_east;
}

//if SW, curr = SW_e
if(entrance == 'sw'){
    pic.src = F1_SW_east.src;
    curr = F1_SW_east;
}
 
//if SE, curr = SE_w
if(entrance == 'se'){
    pic.src = F1_SE_west.src;
    curr = F1_SE_west;
}
  
//if NE, curr = NE_w
if(entrance == 'ne'){
    pic.src = F1_NE_west.src;
    curr = F1_NE_west;
}

document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; //replace .innerHTML with other function?

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





//console.log('test');
//console.log(E_east.getAttribute("forward"));
//console.log(E_east.attributes);



