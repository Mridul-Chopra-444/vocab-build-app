var yr=0;
function rotate_y()
{ 
var v =document.getElementById("cube");
v.style.transform = "rotateY(" + (yr+=90) + "deg) ";
}

var xr=0;
function rotate_x()
{ 
var v =document.getElementById("cube");

v.style.transform = "rotateX(" + (xr+=90) + "deg) ";
}
