package au.com.digitalmarketsquare.mad.core.service;

import au.com.digitalmarketsquare.mad.event.demo.DemoPrintEvent;
import au.com.digitalmarketsquare.mad.event.demo.DemoPrintedEvent;

/**
 * Created by tiden on 9/9/14.
 */
public interface DemoService {
    public DemoPrintedEvent printContent(DemoPrintEvent demoPrintEvent);
}
