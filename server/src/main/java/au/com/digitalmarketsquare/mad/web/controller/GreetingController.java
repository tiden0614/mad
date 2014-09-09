package au.com.digitalmarketsquare.mad.web.controller;

import au.com.digitalmarketsquare.mad.core.domain.Greeting;
import au.com.digitalmarketsquare.mad.core.service.DemoService;
import au.com.digitalmarketsquare.mad.event.demo.DemoPrintEvent;
import au.com.digitalmarketsquare.mad.event.demo.DemoPrintedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Created by tiden on 9/3/14.
 */
@RestController
public class GreetingController {
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    @Autowired
    private DemoService demoService;

    @RequestMapping("/greeting")
    public Greeting greeting(
            @RequestParam(value = "name", required = false, defaultValue = "world") String name
    ) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    @RequestMapping("/demo")
    public DemoPrintedEvent demo(
            @RequestParam(value = "name", required = false, defaultValue = "DEMO") String name
    ) {
        DemoPrintEvent demoPrintEvent = new DemoPrintEvent(name);
        return demoService.printContent(demoPrintEvent);
    };
}
