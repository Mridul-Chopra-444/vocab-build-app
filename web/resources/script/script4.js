var reference = [];
var a =[];
var javaobj;
var spaces=0;
var ptr=0;
var val1;
function src_value(){
    document.getElementById("src-value").innerHTML="  "+getCookie("source");
   
};

function getdata(val)
{    
document.getElementById("container").innerHTML="";
              
  var xhttp= new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState==4 && xhttp.status==200)
      {
             javaobj = JSON.parse(xhttp.response);
           traverse(javaobj);
           test();
      }
      
  };
  xhttp.open("GET","https://googledictionaryapi.eu-gb.mybluemix.net/?define="+val+"&lang=en",true);
  xhttp.send();
    
}





function length(obj)
{ 


  try {
    if(typeof obj =="string"  )
      return 0;
    else
      return Object.keys(obj).length;
    }
catch(err) {
  
  return err;
    }

}



function traverse(obj , parent)
{ 
  

 if(isNaN(parent) | a[1]==0)
  { 
  position_changer(child(obj));
  }
      if(length(obj)>0)
        { 
          
          if(obj===javaobj)
            { 

              a[0]=javaobj.length;
              a[1]=0;              
              var z=[];
              if(obj.length==1)
              {
              var x = document.createElement("TABLE");
              x.border='1'
              x.align="center";
              x.cellSpacing="5px";
              x.cellPadding="5px";
              document.getElementById("container").appendChild(x);
              reference[0]=x;
              }
              else
              {
              for(var i=0;i<obj.length;i++)
              { z[i]="MEANING "+(i+1); }
              create_div(z);
              }
            }

          for(var i=0;i<length(obj);i++)
          {    
              if(isNaN(Object.keys(obj)[i]) )
               {
                if(length(obj[Object.keys(obj)[i]]) > 0)
                {  
                  
                  add_data(Object.keys(obj)[i]);
                }
              }

              

              traverse( obj[Object.keys(obj)[i]] , Object.keys(obj)[i] );
          }  

        }

        else {

         if(!isNaN(parent))
         add_data(parseInt(parent)+1,obj);
        else
          add_data(parent,obj);
        }

}







function create_div(button_info)
{ 
      var divs=[];
      var container=document.getElementById("container");      
      while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

      for(var i=0;i<button_info.length;i++)
      {

        var btn = document.createElement("div"); 
             btn.innerHTML = button_info[i]; 
             btn.className="collapsible";
             btn.id="collapsible"                 
             container.appendChild(btn);         
           
        var div = document.createElement("div"); 
             div.className="content"; 
             container.appendChild(div);
           
            
            var x = document.createElement("TABLE");
            x.border='1'
            x.align="center";
            x.cellSpacing="5px";
            x.cellPadding="5px";
            div.appendChild(x);

            divs[i]=x;
      }
add_tables(divs);                   

}

function add_tables(input)
{
for(z=0;z<input.length;z++)
reference[z]=input[z];  
}



function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}





  function makeRadioButton(name, value, text) {

    
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = name;
    radio.value = value;
    radio.id="raw";

    return radio;
  }



function add_data(text1,text2)
{ 


if(text1=="definition")
{ 

var row = document.createElement("TR");
 
var cell1 = document.createElement("TH");
var t1 = document.createTextNode(text1);
cell1.appendChild(t1);
var cell2 = document.createElement("TD");
var t2 = document.createTextNode(text2);
cell2.appendChild(t2);
  
row.appendChild(cell1);
row.appendChild(cell2);

var table = reference[ptr];



var cell3 = document.createElement("TD");
var radio=makeRadioButton("save", text2, "Save Defination");
cell3.appendChild(radio);
row.appendChild(cell3);

table.appendChild(row);


}

 

else if(text2===undefined)
  { 

var row = document.createElement("TR");
row.align="center"; 

var cell1 = document.createElement("TH");
cell1.colSpan=3;
var t1 = document.createTextNode(text1);
cell1.appendChild(t1);

row.appendChild(cell1);
var table = reference[ptr];
table.appendChild(row);
}


else if(validURL(text2))
  { 

var row = document.createElement("TR");
 
var cell1 = document.createElement("TH");
var t1 = document.createTextNode(text1);
cell1.appendChild(t1);
var cell2 = document.createElement("TD");
var x = document.createElement("AUDIO");
      
  if (x.canPlayType("audio/mpeg")) {
    x.setAttribute("src",text2);
  }
  x.setAttribute("controls", "controls");
cell2.appendChild(x);
var cell3 = document.createElement("TD");

row.appendChild(cell1);
row.appendChild(cell2);
cell2.colSpan=2;
var table = reference[ptr];
table.appendChild(row);
  }


  else
  {
  var row = document.createElement("TR");
  var cell1 = document.createElement("TH");
  var t1 = document.createTextNode(text1);
  cell1.appendChild(t1);
  var cell2 = document.createElement("TD");
  var t2 = document.createTextNode(text2);
  cell2.appendChild(t2);
  row.appendChild(cell1);
  row.appendChild(cell2);
  cell2.colSpan=2;
  var table = reference[ptr];
  table.appendChild(row);
  }
}



function position_changer(childs)
{ 
  if(a[0]!=0)
  {
    if(a[1]>0)
    {
    a[1] = a[1]+childs-1
    }
    else if(a[1]==0)
    {
    a[1]=childs;
    a[0]=a[0]-1;
    ptr=length(javaobj)-1-a[0];
    }
  }
//console.log(a[1]+" , "+a[0])
}


function child(obj)
{
  if(length(obj[Object.keys(obj)])==0 )
  return 0
  else
    return length(obj);
}



 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'raw'){
     
 document.getElementById("word").value=document.getElementById("value").value;
 document.getElementById("meaning").value=e.target.value;
 document.getElementById("source").value=source();
 
         setCookie("value",document.getElementById("value").value,2);
         setCookie("meaning",e.target.value,2);
         
     //console.log(getCookie("value"));
      //console.log(getCookie("meaning"));
              document.getElementById("myForm").submit();
    
    }
 });
 
  
function load()
{
   document.getElementById("value").value=getCookie("value");
   getdata(getCookie("value"));
   var d = new Date();
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
   document.getElementById("date").value=date;

}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

function test(){
    
       var radios = document.getElementsByName('save');
console.log(radios);
for (var i = 0, length = radios.length; i < length; i++)
{
 //if (radios[i].checked)
 {
//console.log(radios[i].value);
  if(  radios[i].value==getCookie('meaning'))
  {
      console.log("yes");
radios[i].checked=true;
break;
  }
 
}
    
    
}}

function source()
{
    
    var source= getCookie("source");
    if(source=="" | source==null | source==undefined)
    {
        source=prompt("Please enter a source (like a book,website or from where you got this word) .");
       setCookie("source",source,0.05);
       document.getElementById("src-value").innerHTML=getCookie("source");
    
    }
    return source;
}


function change_source()
{
    
    var source;
    
        source=prompt("Please enter a source (like a book,website or from where you got this word) .");
       setCookie("source",source,0.05);
       document.getElementById("src-value").innerHTML="  "+getCookie("source");
    
}