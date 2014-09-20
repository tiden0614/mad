package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Administrator on 2014/9/19.
 */
public class Humidity {
    private int time;
    private float xPara;
    private float yPara;
    private float humi;

    public Humidity(float humi) {
        this.humi = humi;
    }

    public Humidity() {
        this.humi = 70;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public float getHumi() {
        return humi;
    }

    public void setHumi(float humi) {
        this.humi = humi;
    }

    public float getyPara() {
        return yPara;
    }

    public void setyPara(float yPara) {
        this.yPara = yPara;
    }

    public float getxPara() {
        return xPara;
    }

    public void setxPara(float xPara) {
        this.xPara = xPara;
    }
}
