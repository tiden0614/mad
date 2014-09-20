package au.com.digitalmarketsquare.mad.web.controller;

import au.com.digitalmarketsquare.mad.core.domain.raw.*;
import au.com.digitalmarketsquare.mad.core.service.mainList.ListGetService;
import au.com.digitalmarketsquare.mad.event.list.CreateListEvent;
import au.com.digitalmarketsquare.mad.event.list.RawListEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by Administrator on 2014/9/20.
 */
@RestController
public class WeatherController {

    @Autowired
    private ListGetService listGetService;

    @RequestMapping("/main")
    public CreateListEvent main(
    ) {
        //fake data
        CurrentTemp currT = new CurrentTemp(15);
        MaxTemp maxT = new MaxTemp(22);
        MinTemp minT = new MinTemp(8);
        RainfallAmount rainfallAmount = new RainfallAmount(2);
        RainfallChance rainfallChance = new RainfallChance(30);
        Humidity humidity = new Humidity(70);

        RawListEvent rawListEvent = new RawListEvent(currT,maxT,minT,rainfallAmount,rainfallChance,humidity);
        return listGetService.CreateMainList(rawListEvent) ;
    }

}
