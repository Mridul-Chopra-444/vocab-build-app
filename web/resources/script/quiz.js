var face=[];
var score=0;

var face_ptr=0;


var questions , answers,dates;
var q=[],a=[],d=[];
window.onload=function(){
   set_data();
  //print();
  face[0]=document.getElementById("front");
face[1]=document.getElementById("left");
face[2]=document.getElementById("back");
face[3]=document.getElementById("right");

  populate_dates();
  if( document.getElementById("quiz").value=="NO")
  {
   document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
  }
  else { 
     if(q.length>=4)
      populate();
  else
  {  document.getElementById("quiz").value="NO"
      alert("YOU HAVE NOT LEARNT ENOUGH WORDS THIS DAY TO UNLOCK QUIZ. PLEASE LEARN AT LEAST 4 WORDS")
      document.getElementById("myForm").submit();
      
  }
}
};

function set_data()
{ 
    
questions =document.getElementById("questions").value.split('');
answers =document.getElementById("answers").value.split('');
dates =document.getElementById("date").value.split('');

var z=0;

for(var i=0;i<questions.length-1;i++)
    { 
        if(q[z]==undefined)
        {q[z]="" };
        if(questions[i]!='#')
        {q[z]=q[z]+questions[i]; }
        else if(questions[i]=="#")
        { z=z+1;}
    }
z=0;
for(var i=0;i<answers.length-1;i++)
    {
         if(a[z]==undefined)
        {a[z]="" };
        if(answers[i]!='#')
        {a[z]=a[z]+answers[i]; }
        else if(answers[i]=="#")
        { z=z+1;}
    }
    z=0;
for(var i=0;i<dates.length-1;i++)
    {
         if(d[z]==undefined)
        {d[z]="" };
        if(dates[i]!='#')
        {d[z]=d[z]+dates[i]; }
        else if(dates[i]=="#")
        { z=z+1;}
    }
};



function print()
{ 
for(var k =0;k<a.length;k++)
{ console.log(k+" : "+a[k]);}    

}

function set_ptr()
{  
    face_ptr+=1;
    if(face_ptr>3)
        face_ptr=0;
}

var i=0;
function populate()
{answered=false;
   while (face[face_ptr].firstChild) {
          face[face_ptr].removeChild(face[face_ptr].firstChild);
        }
face[face_ptr].appendChild(set());
    set_ptr();
    i++;
}

function set()
{ 
    if(i>q.length-1)
    { 
    
    var fframe = document.createElement("div");
       fframe.className="frame";
var div1=document.createElement("div");
        div1.innerHTML="CONGRATULATIONS...."
        var score1=document.createElement("div");
        score1.id="score1";
        score1.innerHTML="YOUR SCORE ";
        var num_sc=document.createElement("div");
        num_sc.innerHTML=score;
      num_sc.id="num_sc";
      fframe.appendChild(div1);
      fframe.appendChild(score1);
      fframe.appendChild(num_sc);
      document.getElementById("quiz").value="NO";
     
      return fframe;
    
    }
var frame = document.createElement("div");
       frame.className="frame";
      
 var que = document.createElement("div"); 
    que.id="que";
    que.innerHTML=q[i];
    var options=[];
    options=get_ans();
var ans=document.createElement("div");
    ans.id="ans";
    var ans0=document.createElement("div");
    ans0.id="ans_s";
    ans0.className="ans_s";
    ans0.innerHTML=options[0];
    var ans1=document.createElement("div");
    ans1.id="ans_s";
    ans1.className="ans_s";
    ans1.innerHTML=options[1];
    var ans2=document.createElement("div");
    ans2.id="ans_s";
    ans2.className="ans_s";
    ans2.innerHTML=options[2];
    var ans3=document.createElement("div");
    ans3.id="ans_s";
    ans3.className="ans_s";
    ans3.innerHTML=options[3];
    
ans.appendChild(ans0);
//ans.innerHTML+="<br>";
ans.appendChild(ans1);
//ans.innerHTML+="<br>";
ans.appendChild(ans2);
//ans.innerHTML+="<br>";
ans.appendChild(ans3);
//ans.innerHTML+="<br>";
frame.appendChild(que);//frame.innerHTML+="<br>";
frame.appendChild(ans);

return frame;
}


function get_ans()
{  
    
    var ans=[];
  var correct=  Math.floor((Math.random() * 4) + 0);
  console.log("correct :"+ correct)
  var occoured=[];
  occoured.push(i);
    ans[correct]=a[i];
    for(var z=0;z<=3;z++)
    { 
         
        
        var index=Math.floor((Math.random() * q.length) +0);
        console.log("index : " + index);
        if(index==i | exist(index,occoured))
        {   z--;
            continue; 
        }
       else  if(z!=correct ) 
        { 
           ans[z]=a[index]; 
           occoured.push(index);
           
        }
    
        
    }
        for(z=0;z<=3;z++)
        { //console.log(ans[z]);
          
        }
        return ans;
    }


function exist(val , array)
{ 
for(var i=0;i<array.length;i++)
{ 
 if(array[i]==val)
 {return true};
 }    
return false;
}

var answered = false;
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'ans_s' & !answered){
     
   if(e.target.innerHTML==a[i-1])
   {e.target.style.backgroundColor="#99ff99";
    score++;
        }
   else{ e.target.style.backgroundColor="#ff9999";
   
        var s=[];
       s=document.getElementsByClassName("ans_s");
        for(var p=0;p<s.length;p++)
        { 
         if(s[p].innerHTML==a[i-1])
           {      s[p].style.backgroundColor="#99ff99"; ;}
         }
        
        }
    answered=true;
    }
 });
 
 
 function populate_dates()
 { 
var  parent=document.getElementById("light");
for(var i=0;i<d.length;i++)
{
  var date = document.createElement("BUTTON");
 date.className="sdate";
 date.id="sdate";
 date.innerHTML=d[i];
 parent.appendChild(date);
 }   
 
 }
 
 
 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'sdate' ){
     document.getElementById("date").value=e.target.innerHTML;
     document.getElementById("quiz").value="YES";
         
         document.getElementById("myForm").submit();
    }
 });


