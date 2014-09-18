package au.com.digitalmarketsquare.mad.core.service.mainList;

import au.com.digitalmarketsquare.mad.core.domain.List;
import au.com.digitalmarketsquare.mad.event.list.LocationEvent;
import au.com.digitalmarketsquare.mad.event.list.MainListEvent;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public abstract  class ListGetEventHandler implements ListGetService{
    public MainListEvent getList(MainListEvent mainListEvent){
        List mainList=new List();
        //MainListEvent mainListEvent=new MainListEvent(mainList);
        return mainListEvent;


    }
}