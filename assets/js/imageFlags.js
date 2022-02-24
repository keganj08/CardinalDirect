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

console.log(image.attributes);

//attributes will be in attribute.value (upStairs.value)

console.log("---------")
var image2 = document.createElement('img');
image.src='assets/images/building interiors/1st floor/20220222_193502.jpg';

image2.setAttribute("upStairs","true");
image2.setAttribute("downStairs","true");
image2.setAttribute("forward","true");
image2.setAttribute("left","false");
image2.setAttribute("right","false");
image2.setAttribute("backward","false");

console.log(image2.attributes);
//console.log(image2.getAttribute(upStairs));
