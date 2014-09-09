package au.com.digitalmarketsquare.mad.event.demo;

import au.com.digitalmarketsquare.mad.event.ReadEvent;

/**
 * Created by tiden on 9/9/14.
 */
public class DemoPrintedEvent extends ReadEvent{
    private String content;
    public DemoPrintedEvent(String content) {
        this.content = content;
    }
    public String getContent() {
        return content;
    }
}
