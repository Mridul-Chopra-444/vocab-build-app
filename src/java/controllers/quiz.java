
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
public class quiz {
    Connection cn;
String url,sql;
Statement st;
ResultSet rs;
String questions="",answers="",dates="";
    @RequestMapping(method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
      Bean userForm = new Bean();    
      
      if(!userForm.login)
      {return"invalid"; }
        model.put("userForm", userForm);
         userForm.status=get(userForm.date,userForm.id);
        userForm.questions="";
        userForm.answers="";
        
        userForm.questions=questions;
        userForm.answers=answers;
         
         userForm.status=get_dates(userForm.id);
        userForm.date="";
        userForm.date=dates;
        return "quiz";
    }    
    @RequestMapping(method = RequestMethod.POST)
	public String processRegistration(@ModelAttribute("userForm") Bean user, 
			Map<String, Object> model) {
            
        user.status=get(user.date,user.id);
        user.questions="";
        user.answers="";
        
        user.questions=questions;
        user.answers=answers;
        user.status=get_dates(user.id);
        user.date="";
        user.date=dates;
            return "quiz";
            
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
        
        
        public String get(String date , String id)
        { questions="";answers="";
        myconnection();
        try{ 
            sql="Select * from words where doa='"+date+"' and id='"+id+"' ;";
            st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
             rs=st.executeQuery(sql);
          while (rs.next())
             { 
             questions=questions+rs.getString("word")+"#";
             answers=answers+rs.getString("meaning")+"#";
             } 
        return "Successful";
        }
        catch(Exception e)
        { return e.toString();}
        
        
        }
 public String get_dates( String id)
        { dates="";
        myconnection();
        try{ 
            sql="Select distinct doa from words where id='"+id+"' ;";
            st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
             rs=st.executeQuery(sql);
          while (rs.next())
             { 
             dates=dates+rs.getString("doa")+"#";
             
             } 
        return "Successful";
        }
        catch(Exception e)
        { return e.toString();}
        
        
        }
        
}


