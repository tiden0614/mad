package au.com.digitalmarketsquare.mad.core.service.mainList;


import au.com.digitalmarketsquare.mad.core.domain.List;
import au.com.digitalmarketsquare.mad.event.list.DataPackageEvent;
import au.com.digitalmarketsquare.mad.event.list.LocationEvent;
import au.com.digitalmarketsquare.mad.event.list.MainListEvent;
import au.com.digitalmarketsquare.mad.event.list.CreateListEvent;
import au.com.digitalmarketsquare.mad.event.list.RawListEvent;


/**
 * Created by Administrator on 2014/9/19.
 */
public interface ListGetService {

    public MainListEvent getList(DataPackageEvent dataPackageEvent);


    public CreateListEvent CreateMainList( RawListEvent rawListEvent );

}
