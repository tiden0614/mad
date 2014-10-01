package au.com.digitalmarketsquare.mad.core.service.mainList;

import au.com.digitalmarketsquare.mad.core.domain.ListItem;
import au.com.digitalmarketsquare.mad.event.list.CreateListEvent;
import au.com.digitalmarketsquare.mad.event.list.RawListEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2014/9/19.
 */

@Service
public class ListGetServiceHandler implements ListGetService {

    @Autowired
    private ListItem[] listItems;
    @Override
    public CreateListEvent CreateMainList ( RawListEvent rawListEvent){
        listItems = new ListItem[7];
        for(int i=0;i<7;i++) {
            listItems[i] = new ListItem(
                    rawListEvent.getCurrT().getTemp(), rawListEvent.getMaxT().getTemp(),
                    rawListEvent.getMinT().getTemp(), rawListEvent.getRainfallAmount().getAmount(),
                    rawListEvent.getRainfallChance().getChance(), rawListEvent.getHumi().getHumi()
            );
        }
        CreateListEvent createListEvent = new CreateListEvent( listItems );
        return createListEvent;
    }
}
