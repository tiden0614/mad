package au.com.digitalmarketsquare.mad.event.demo;

import au.com.digitalmarketsquare.mad.event.RequestReadEvent;

/**
 * Created by tiden on 9/9/14.
 */
public class DemoPrintEvent extends RequestReadEvent {
    private String name;
    public DemoPrintEvent(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
