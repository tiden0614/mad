package au.com.digitalmarketsquare.mad.core.domain;

import org.springframework.stereotype.Repository;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
@Repository
public class ListItem {
    private float currentTemp;
    private float maxTemp;
    private float minTemp;
    private float rainfallAmount;
    private float rainfallChance;
    private float humidity;

    public ListItem() {
    }

    public ListItem(float currentTemp, float maxTemp, float minTemp, float rainfallAmount, float rainfallChance, float humidity) {

        this.currentTemp = currentTemp;
        this.maxTemp = maxTemp;
        this.minTemp = minTemp;
        this.rainfallAmount = rainfallAmount;
        this.rainfallChance = rainfallChance;
        this.humidity = humidity;
    }

    public float getCurrentTemp() {
        return currentTemp;
    }

    public void setCurrentTemp(float currentTemp) {
        this.currentTemp = currentTemp;
    }

    public float getMaxTemp() {
        return maxTemp;
    }

    public void setMaxTemp(float maxTemp) {
        this.maxTemp = maxTemp;
    }

    public float getMinTemp() {
        return minTemp;
    }

    public void setMinTemp(float minTemp) {
        this.minTemp = minTemp;
    }

    public float getRainfallAmount() {
        return rainfallAmount;
    }

    public void setRainfallAmount(float rainfallAmount) {
        this.rainfallAmount = rainfallAmount;
    }

    public float getRainfallChance() {
        return rainfallChance;
    }

    public void setRainfallChance(float rainfallChance) {
        this.rainfallChance = rainfallChance;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }
}
