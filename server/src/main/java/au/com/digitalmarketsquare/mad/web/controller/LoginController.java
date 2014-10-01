package au.com.digitalmarketsquare.mad.web.controller;

import au.com.digitalmarketsquare.mad.core.domain.user.User;
import au.com.digitalmarketsquare.mad.core.service.login.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

/**
 * Created by Administrator on 2014/9/25.
 */
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping(value="/", method=RequestMethod.GET)

    public  @ResponseBody String loginUser( HttpServletResponse response,
            @RequestParam(value = "email", required = true) String email
    ) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8100");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "60");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        //fake data
        ArrayList userlist = new ArrayList();
        User[] users = new User[3];
        users[0]=new User("e1","p1");
        users[1]=new User("e2","p2");
        users[2]=new User("e3","p3");
        userlist.add(users[0]);
        userlist.add(users[1]);
        userlist.add(users[2]);

        int ID;
        ID = userService.SearchExistingUser(userlist,email);
        if( ID!=-1) {
            User currUser= new User();
            currUser= (User) userlist.get(ID);
            return currUser.getPassword();
        }
        else
            return null;
    }

}