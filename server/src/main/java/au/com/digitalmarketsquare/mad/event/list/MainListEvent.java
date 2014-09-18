package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.List;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class MainListEvent {
    private List list;

    public MainListEvent() {
    }

    public MainListEvent(List list) {
        this.list = list;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }
}
