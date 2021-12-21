
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
public class quotes {
    Connection cn;
String url,sql;
Statement st;
ResultSet rs;
    @RequestMapping(method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
      Bean userForm = new Bean();
     
        model.put("userForm", userForm);
         if(!userForm.login)
      {return"invalid"; }
         else
        return "quotes";
    }    
    @RequestMapping(method = RequestMethod.POST)
	public String processRegistration(@ModelAttribute("userForm") Bean user, 
			Map<String, Object> model) {
            
		
                        user.status=insert(user.quotes,user.source,user.id);
                        //user.words_added=user.words_added+1;
           // System.out.println("------------------------->>>>>>>>>"+user.words_added);
            
            
            return "quotes";
            
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
        
        
        
        public String insert(String quote,String source,String user)
{
    try{
	myconnection();
                         sql="Insert into quotes values ('"+quote+"','"+source+"', '"+user+"' );";
                         st=cn.createStatement();
                         st.executeUpdate(sql);
                     return "SUCCESS";
           }
catch(Exception e)
{return e.toString();}
}

        
        
}


