package au.com.digitalmarketsquare.mad.core.service.mainList;

import au.com.digitalmarketsquare.mad.event.list.CreateListEvent;
import au.com.digitalmarketsquare.mad.event.list.RawListEvent;

/**
 * Created by Administrator on 2014/9/19.
 */
public interface ListGetService {
    public CreateListEvent CreateMainList( RawListEvent rawListEvent );
}
