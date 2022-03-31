
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
    pic.src = NW_east.src;
    curr = NW_east;
}

//if SW, curr = SW_e
if(entrance == 'sw'){
    pic.src = SW_east.src;
    curr = SW_east;
}
 
//if SE, curr = SE_w
if(entrance == 'se'){
    pic.src = SE_west.src;
    curr = SE_west;
}
  
//if NE, curr = NE_w
if(entrance == 'ne'){
    pic.src = NE_west.src;
    curr = NE_west;
}

document.getElementById("roomsLeft").innerHTML = curr.attributes.leftRooms.value;
document.getElementById("roomsRight").innerHTML = curr.attributes.rightRooms.value; //replace .innerHTML with other function?





//console.log('test');
//console.log(E_east.getAttribute("forward"));
//console.log(E_east.attributes);



