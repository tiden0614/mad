package au.com.digitalmarketsquare.mad.event.list;

import au.com.digitalmarketsquare.mad.core.domain.raw.*;

/**
 * Created by Administrator on 2014/9/19.
 */
public class RawListEvent {

    private CurrentTemp currT;
    private MaxTemp maxT;
    private MinTemp minT;
    private RainfallAmount rainfallAmount ;
    private RainfallChance rainfallChance;
    private Humidity humi;

    public RawListEvent(){
    }

    public RawListEvent(CurrentTemp currT, MaxTemp maxT,MinTemp minT,RainfallAmount rainfallAmount,RainfallChance rainfallChance, Humidity humi) {
        this.currT = currT;
        this.humi = humi;
        this.rainfallChance = rainfallChance;
        this.rainfallAmount = rainfallAmount;
        this.minT = minT;
        this.maxT = maxT;
    }

    public Humidity getHumi() {
        return humi;
    }

    public void setHumi(Humidity humi) {
        this.humi = humi;
    }

    public CurrentTemp getCurrT() {
        return currT;
    }

    public void setCurrT(CurrentTemp currT) {
        this.currT = currT;
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

    public MinTemp getMinT() {
        return minT;
    }

    public void setMinT(MinTemp minT) {
        this.minT = minT;
    }

    public MaxTemp getMaxT() {
        return maxT;
    }

    public void setMaxT(MaxTemp maxT) {
        this.maxT = maxT;
    }
}
