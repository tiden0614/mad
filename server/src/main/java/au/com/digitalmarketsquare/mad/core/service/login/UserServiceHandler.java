package au.com.digitalmarketsquare.mad.core.service.login;

import au.com.digitalmarketsquare.mad.core.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Created by Administrator on 2014/9/26.
 */
@Service
public class UserServiceHandler implements UserService {


    @Override
    public int  SearchExistingUser ( ArrayList userList,String email){
        User temp = new User();
        for(int i=0;i<userList.size();i++){
            temp =(User) userList.get(i);
            if (email.equals(temp.getEmail())){
                return i;
            }
        }
        return -1;
    }
}
