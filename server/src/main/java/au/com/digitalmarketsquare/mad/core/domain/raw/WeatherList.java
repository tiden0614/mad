package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Gao Jiang on 2014/9/19.
 */
public class WeatherList {
    private Weather[] weatherList;

    public WeatherList() {
        weatherList = new Weather[7];

        for (int i = 0; i < 7; i++)
            this.weatherList[i] = new Weather();
    }

    public Weather[] getWeatherList() {
        return weatherList;
    }

    public void setWeatherList(Weather[] weatherList) {
        this.weatherList = weatherList;
    }
}
