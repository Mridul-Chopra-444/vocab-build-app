 
 document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'collapsible'){
    	var coll = e.target;
    	coll.classList.toggle("active");
    var panel = coll.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
    }
 });


