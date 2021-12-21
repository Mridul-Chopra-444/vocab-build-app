
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
public class signup {
    Connection cn;
String url,sql;
Statement st;
ResultSet rs;
    @RequestMapping(method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
      Bean userForm = new Bean();    
      
        model.put("userForm", userForm);
         
        return "signup";
    }    
    @RequestMapping(method = RequestMethod.POST)
	public String processRegistration(@ModelAttribute("userForm") Bean user, 
			Map<String, Object> model) {
            
		
                        user.status=signup(user.id,user.password,user.email);
                        if(user.status!="ACCOUNT ALREADY EXISTS")
                        return "signup";
                        else
                            return"signup";
            
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
        
        
        
        public String signup(String id,String password,String email)
{
    try{
	myconnection();
                        sql="Select * from users where id='"+id+"' ;";
                        st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
                        rs=st.executeQuery(sql);
                        if(rs.next())
                        {
                            return "ACCOUNT ALREADY EXISTS";
                        }
                        else { 
                            sql="Insert into users values ('"+id+"' ,'"+password+"','"+email+"' );";
                            st=cn.createStatement();
                            st.executeUpdate(sql);
                            return "SIGN UP SUCCESSFULL";
                        }
           }
catch(Exception e)
{return e.toString();}
}

        
        
}


