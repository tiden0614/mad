package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.ListItem;

/**
 * Created by Administrator on 2014/9/20.
 */
public class CreateListEvent {
    private ListItem[] listItems = new ListItem[7];

    public CreateListEvent(ListItem[] listItems) {

        this.listItems = listItems;
    }

    public ListItem[] getListItems() {
        return listItems;
    }
}
