package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Gao Jiang on 2014/9/19.
 */
public class Weather {
    private CurrentTemp currentTemp;
    private MaxTemp maxTemp;
    private MinTemp minTemp;
    private Humidity humidity;
    private RainfallChance rainfallChance;
    private RainfallAmount rainfallAmount;

    public Weather() {
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

    public RainfallChance getRainfallChance() {
        return rainfallChance;
    }

    public void setRainfallChance(RainfallChance rainfallChance) {
        this.rainfallChance = rainfallChance;
    }

    public RainfallAmount getRainfallAmount() {
        return rainfallAmount;
    }

    public void setRainfallAmount(RainfallAmount rainfallAmount) {
        this.rainfallAmount = rainfallAmount;
    }
}
