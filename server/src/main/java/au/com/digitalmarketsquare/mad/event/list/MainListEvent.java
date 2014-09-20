package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.List;
import au.com.digitalmarketsquare.mad.core.domain.raw.WeatherList;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class MainListEvent {
    private WeatherList weatherList;

    public MainListEvent() {
    }

    public WeatherList getWeatherList() {
        return weatherList;
    }

    public void setWeatherList(WeatherList weatherList) {
        this.weatherList = weatherList;
    }
}
