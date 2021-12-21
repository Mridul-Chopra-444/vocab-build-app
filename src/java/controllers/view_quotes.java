
package controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.mail.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/search")
public class view_quotes {
    Connection cn;
String url,sql,src="",quotes="";
Statement st;
ResultSet rs;
    @RequestMapping(method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
      Bean userForm = new Bean();    
      
        model.put("userForm", userForm);
         if(!userForm.login)
      {return"invalid"; }
                        userForm.status=get_quotes(userForm.id);
                        userForm.quotes="";
                        userForm.source="";
                        userForm.quotes=quotes;
                        userForm.source=src;
                        return "view_quotes";    }    
    @RequestMapping(method = RequestMethod.POST)
	public String processRegistration(@ModelAttribute("userForm") Bean user, 
			Map<String, Object> model) {
            
	user.status=update(user.quotes,user.nquote,user.source,user.id);
                      user.status=get_quotes(user.id);
                        user.quotes="";
                        user.source="";
                        user.quotes=quotes;
                        user.source=src;
                       
            
                return "view_quotes";
            
    }
        public void myconnection()
    { 
        try
        {
      Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance() ;
       String url="jdbc:sqlserver://localhost;instance=LallyInfosys;databaseName=vocab;user=MRIDUL_abc;password=123";
           cn=DriverManager.getConnection(url);    }
        catch(Exception e)
        { System.out.println(e);} }
        
        
        
        public String get_quotes(String id)
{
    try{
	myconnection();
                       sql="Select * from quotes where id='"+id+"' order by src";  
                       st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
                       rs=st.executeQuery(sql);
                       quotes="";
                       src="";
                       while(rs.next())
                       { 
                           quotes+=rs.getString("quote")+"#";
                            src+=rs.getString("src")+"#";
                       }
                       return (quotes.length()+"");
           }
catch(Exception e)
{return e.toString();}
}

public String update(String pquote ,String nquote ,String src, String id)
{ 
myconnection();
try{
sql="Select * from quotes where quote='"+pquote+"' and src='"+src+"'  and id='"+id+"';";
st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
rs=st.executeQuery(sql);
if(rs.next())
{
sql="Update quotes set quote='"+nquote+"' where quote='"+pquote+"' and src='"+src+"'  and id='"+id+"';";
st=cn.createStatement();
st.executeUpdate(sql);
}
else { 
return "NOT FOUND";
}
return "SUCCESS";
}
catch(Exception e)
{
    return e.toString();
} 

}        
        
}


