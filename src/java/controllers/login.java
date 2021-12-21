
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
public class login {
    
    Connection cn;
String url,sql;
Statement st;
ResultSet rs;
    @RequestMapping(method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
     
        Bean userForm = new Bean();
        userForm.login=false;
        model.put("userForm", userForm);
        return "login";
    }    
    @RequestMapping(method = RequestMethod.POST)
	public String processRegistration(@ModelAttribute("userForm") Bean user, 
			Map<String, Object> model) {
            
		
                        user.status=check(user.id,user.password);
                        if(user.status!="SUCCESSFUL")
                        return "login";
                        else
                        { 
                           user.login=true;
                            return"other"; 
                        }
            
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
        
        
        
        public String check(String id,String password)
{
    try{
                        myconnection();
                        sql="Select * from users where id='"+id+"' and passw='"+password+"' ;";
                        st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
                        rs=st.executeQuery(sql);
                        if(rs.next())
                        {
                            return "SUCCESSFUL";
                        }
                        else { 
                             return "Wrong Credentials";
                        }
           }
catch(Exception e)
{return e.toString();}
}

        
        
}


