package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.List;

import au.com.digitalmarketsquare.mad.core.domain.raw.WeatherList;

import au.com.digitalmarketsquare.mad.core.domain.ListItem;


/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class MainListEvent {

    private WeatherList weatherList;

    private ListItem[] listItems;


    public MainListEvent() {
    }


    public WeatherList getWeatherList() {
        return weatherList;
    }

    public void setWeatherList(WeatherList weatherList) {
        this.weatherList = weatherList;
    }

    public ListItem[] getListItems() {
        return listItems;
    }

    public void setListItems(ListItem[] listItems) {
        this.listItems = listItems;
    }

}
