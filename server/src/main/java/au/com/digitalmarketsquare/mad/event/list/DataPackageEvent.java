package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.raw.*;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class DataPackageEvent {
    private CurrentTemp currentTemp;
    private MaxTemp maxTemp;
    private MinTemp minTemp;
    private Humidity humidity;
    private RainfallAmount rainfallAmount;
    private RainfallChance rainfallChance;

    public DataPackageEvent() {
    }

    public CurrentTemp getCurrentTemp() {
        return currentTemp;
    }

    public void setCurrentTemp(CurrentTemp currentTemp) {
        this.currentTemp = currentTemp;
    }

    public MaxTemp getMaxTemp() {
        return maxTemp;
    }

    public void setMaxTemp(MaxTemp maxTemp) {
        this.maxTemp = maxTemp;
    }

    public MinTemp getMinTemp() {
        return minTemp;
    }

    public void setMinTemp(MinTemp minTemp) {
        this.minTemp = minTemp;
    }

    public Humidity getHumidity() {
        return humidity;
    }

    public void setHumidity(Humidity humidity) {
        this.humidity = humidity;
    }

    public RainfallAmount getRainfallAmount() {
        return rainfallAmount;
    }

    public void setRainfallAmount(RainfallAmount rainfallAmount) {
        this.rainfallAmount = rainfallAmount;
    }

    public RainfallChance getRainfallChance() {
        return rainfallChance;
    }

    public void setRainfallChance(RainfallChance rainfallChance) {
        this.rainfallChance = rainfallChance;
    }
}
