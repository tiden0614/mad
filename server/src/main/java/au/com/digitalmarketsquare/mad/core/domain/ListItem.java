package au.com.digitalmarketsquare.mad.core.domain;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class ListItem {
    private String currentTemp;
    private String maxTemp;
    private String minTemp;
    private String rainfallAmount;
    private String rainfallChance;
    private String humidity;

    public ListItem() {

    }

    public ListItem(String currentTemp, String maxTemp, String minTemp, String rainfallAmount, String rainfallChance, String humidity) {

        this.currentTemp = currentTemp;
        this.maxTemp = maxTemp;
        this.minTemp = minTemp;
        this.rainfallAmount = rainfallAmount;
        this.rainfallChance = rainfallChance;
        this.humidity = humidity;
    }

    public String getCurrentTemp() {
        return currentTemp;
    }

    public void setCurrentTemp(String currentTemp) {
        this.currentTemp = currentTemp;
    }

    public String getMaxTemp() {
        return maxTemp;
    }

    public void setMaxTemp(String maxTemp) {
        this.maxTemp = maxTemp;
    }

    public String getMinTemp() {
        return minTemp;
    }

    public void setMinTemp(String minTemp) {
        this.minTemp = minTemp;
    }

    public String getRainfallAmount() {
        return rainfallAmount;
    }

    public void setRainfallAmount(String rainfallAmount) {
        this.rainfallAmount = rainfallAmount;
    }

    public String getRainfallChance() {
        return rainfallChance;
    }

    public void setRainfallChance(String rainfallChance) {
        this.rainfallChance = rainfallChance;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }
}
