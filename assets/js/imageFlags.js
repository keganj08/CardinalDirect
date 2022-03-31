//js file to set flags of all images
//this js file is linked to interior html page at the moment, should probably move reference to js script?
//alert("js connected");
var image = document.createElement('img');
//image.src='assets/images/building interiors/CarnegieEntry-example.jpg';

image.setAttribute("upStairs","true");
image.setAttribute("downStairs","true");
image.setAttribute("forward","true");
image.setAttribute("left","false");
image.setAttribute("right","false");
image.setAttribute("backward","false");
//set attribute for what classroom number(s) is in picture frame
image.setAttribute("leftRooms", "101, 202");
image.setAttribute("rightRooms", "101, 202");
//console.log(image.attributes);
//console.log(image.attributes.leftRooms);

image.setAttribute("forwardClick", "/picPath");

//attributes will be in attribute.value (upStairs.value)
//console.log(E_east.attributes.forward.value); //this is how to grab specific value
//console.log(E_east.getAttribute(upStairs));






//var naming convention - intersection_direction

//floor 0 - basement 
var E_east = document.createElement('img');
E_east.src='assets/images/building interiors/floor0/e_intersection/east.jpg';
console.log(E_east.attributes);



//floor 1
//NE
var NE_west = document.createElement('img');
NE_west.src='assets/images/building interiors/floor1/ne_intersection/west.jpg';

//NW
var NW_east = document.createElement('img');
NW_east.src='assets/images/building interiors/floor1/nw_intersection/east.jpg';

//SE
var SE_west = document.createElement('img');
SE_west.src='assets/images/building interiors/floor1/se_intersection/west.jpg';

var SE_east = document.createElement('img');
SE_east.src='assets/images/building interiors/floor1/se_intersection/east.jpg';
SE_east.setAttribute("test", "testval");
SE_east.setAttribute("backward", "true");
SE_east.setAttribute("backwardImg", "assets/images/building interiors/floor1/sw_intersection/east.jpg");
SE_east.setAttribute("backwardVar", "SW_east");
//not finished^

//SW
var SW_east = document.createElement('img');
SW_east.src='assets/images/building interiors/floor1/sw_intersection/east.jpg';
SW_east.setAttribute("upStairs","false");
SW_east.setAttribute("downStairs","false");
SW_east.setAttribute("forward","true");
SW_east.setAttribute("forwardImg", "assets/images/building interiors/floor1/se_intersection/east.jpg")
SW_east.setAttribute("forwardVar", "SE_east");
SW_east.setAttribute("left","true");
SW_east.setAttribute("leftImg", "assets/images/building interiors/floor1/sw_intersection/north.jpg")
SW_east.setAttribute("leftVar", "SW_north");
SW_east.setAttribute("right","true");
SW_east.setAttribute("rightImg", "assets/images/building interiors/floor1/sw_intersection/south.jpg")
SW_east.setAttribute("rightVar", "SW_south");
SW_east.setAttribute("backward","false");
SW_east.setAttribute("leftRooms", " ");
SW_east.setAttribute("rightRooms", "104");

var SW_north = document.createElement('img');
SW_north.src='assets/images/building interiors/floor1/sw_intersection/east.jpg';









