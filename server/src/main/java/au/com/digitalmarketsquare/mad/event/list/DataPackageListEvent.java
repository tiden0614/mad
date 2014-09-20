package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.raw.WeatherList;

/**
 * Created by Gao Jiang on 2014/9/20.
 */
public class DataPackageListEvent {
    private WeatherList weatherList;

    public DataPackageListEvent() {
    }

    public WeatherList getWeatherList() {
        return weatherList;
    }

    public void setWeatherList(WeatherList weatherList) {
        this.weatherList = weatherList;
    }
}
