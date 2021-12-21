var src=[];
var quotes=[];
var ps=null;



window.onload=function(){
    
    
   make_view();
   
}
function set_data()
{ 
    
q =document.getElementById("quotes").value.split('');
s =document.getElementById("src").value.split('');
var z=0;

for(var i=0;i<q.length-1;i++)
    { 
        if(quotes[z]==undefined)
        {quotes[z]="" };
        if(q[i]!='#')
        {quotes[z]=quotes[z]+q[i]; }
        else if(q[i]=="#")
        { z=z+1;}
    }
z=0;
for(var i=0;i<s.length-1;i++)
    {
         if(src[z]==undefined)
        {src[z]="" };
        if(s[i]!='#')
        {src[z]=src[z]+s[i]; }
        else if(s[i]=="#")
        { z=z+1;}
    }
  
    for(var i=0;i<quotes.length;i++)
        console.log(quotes[i]);
   
};


function make_view()
{    set_data();
     var divs=[];
      var container=document.getElementById("container");      
      while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        
     for(var i=0;i<src.length;i++)
      {

             var btn = document.createElement("div"); 
             btn.innerHTML = src[i]; 
             btn.className="collapsible";
             btn.id="collapsible"                 
             container.appendChild(btn);         
            
            var div = document.createElement("div"); 
             div.className="content"; 
             container.appendChild(div);
             
             var x = document.createElement("TABLE");
            x.cellSpacing="15px";
            x.cellPadding="15px";
            div.appendChild(x);
            
            ps=src[i];
            while(src[i]==ps)
            {
                var row = document.createElement("TR");
                var cell1 = document.createElement("TD");
                var btn = document.createElement("div"); 
                btn.innerHTML = quotes[i]; 
                btn.className=src[i];
                btn.id="EDIT"                 
                cell1.appendChild(btn);
                row.appendChild(cell1);
                x.appendChild(row);
                i++;
            }
            i--;
//console.log(i);
}

    
}

 
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'EDIT' ){
     document.getElementById("set").value= e.target.innerHTML;
     document.getElementById("quotes").value= e.target.innerHTML;
    document.getElementById("src").value= e.target.className;
     document.getElementById('light').style.display='block';
     document.getElementById('fade').style.display='block';
        
    }
 });

function save_changes()
{
    document.getElementById("nquote").value= document.getElementById("set").value;
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
    document.getElementById('myform').submit();
}
