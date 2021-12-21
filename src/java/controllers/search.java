
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
public class search {
    Connection cn;
String url,sql;
Statement st;
ResultSet rs;
    @RequestMapping(method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
      Bean userForm = new Bean();   
     
        model.put("userForm", userForm);
         if(userForm.login)
        return "search";
         else return "invalid";
    }    
    @RequestMapping(method = RequestMethod.POST)
	public String processRegistration(@ModelAttribute("userForm") Bean user, 
			Map<String, Object> model) {
            
		
                        user.status=insert(user.word,user.meaning,user.source,user.date,user.id);
                        user.words_added=user.words_added+1;
            System.out.println("------------------------->>>>>>>>>"+user.words_added);
            
            
            return "search";
            
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
        
        
        
        public String insert(String word,String meaning,String source,String date,String id)
{
    try{
	myconnection();	
        sql="Select * from words where word='"+word+"' and id='"+id+"' ;";
        st=cn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
             rs=st.executeQuery(sql);
        if(rs.next())
        {
        sql="Update words set meaning='"+meaning+"' where word='"+word+"' and id='"+id+"' ;";
        st=cn.createStatement();
         st.executeUpdate(sql);
         return "updated";
        }
        else{
        sql="Insert into words values ('"+word+"','"+meaning+"', '"+source+"' ,'"+date+"' , '"+id+"') ;";
        st=cn.createStatement();
         st.executeUpdate(sql);
        }
        return "Successful";
}
catch(Exception e)
{return e.toString();}
}

        
        
}


