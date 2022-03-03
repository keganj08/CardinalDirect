//js file to set flags of all images
//this js file is linked to interior html page at the moment, should probably move reference to js script?
//alert("js connected");
var image = document.createElement('img');
image.src='assets/images/building interiors/CarnegieEntry-example.jpg';

image.setAttribute("upStairs","true");
image.setAttribute("downStairs","true");
image.setAttribute("forward","true");
image.setAttribute("left","false");
image.setAttribute("right","false");
image.setAttribute("backward","false");
//set attribute for what classroom number(s) is in picture frame
image.setAttribute("leftRooms", "101, 202");
image.setAttribute("rightRooms", "101, 202");
console.log(image.attributes);
console.log(image.attributes.rooms);

//attributes will be in attribute.value (upStairs.value)

console.log("---floor 1------")
//floor 1 
var f1_mid_e_to_ne = document.createElement('img');
image.src='assets/images/building interiors/1st floor/floor1_mid_e_to_ne.jpg';
f1_mid_e_to_ne.setAttribute("upStairs","false");
f1_mid_e_to_ne.setAttribute("downStairs","false");
f1_mid_e_to_ne.setAttribute("forward","true");
f1_mid_e_to_ne.setAttribute("left","true");
f1_mid_e_to_ne.setAttribute("right","false");
f1_mid_e_to_ne.setAttribute("backward","true");

console.log(f1_mid_e_to_ne.attributes);
console.log(f1_mid_e_to_ne.attributes.forward.value); //this is how to grab specific value
//console.log(f1_mid_e_to_ne.getAttribute(upStairs));
