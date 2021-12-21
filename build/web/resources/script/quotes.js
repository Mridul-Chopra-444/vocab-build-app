
window.onload=function(){
    document.getElementById("source").value=getCookie("quote_src");
  
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


function set()
{
    if(getCookie("quote_src")==""|getCookie("quote_src")==null |getCookie("quote_src")==undefined )
    {
        var source=prompt("PLEASE ENTER A SOURCE..");
        if(source==null || source=="" || source==undefined)
        { alert ("Please Enter a valid Source");
            set();
        }
        else{
            setCookie("quote_src",source,2);

            document.getElementById("source").value=source;
                   }
    }
    else
    {document.getElementById("source").value=getCookie("quote_src"); }
}



