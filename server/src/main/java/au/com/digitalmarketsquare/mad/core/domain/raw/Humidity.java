package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class Humidity {
    private int time;
    private float xPara;
    private float yPara;
    private float humidity; //presented by percent

    public Humidity() {
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public float getxPara() {
        return xPara;
    }

    public void setxPara(float xPara) {
        this.xPara = xPara;
    }

    public float getyPara() {
        return yPara;
    }

    public void setyPara(float yPara) {
        this.yPara = yPara;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }
}

