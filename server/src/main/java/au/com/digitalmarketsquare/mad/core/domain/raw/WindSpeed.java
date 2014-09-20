package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Administrator on 2014/9/19.
 */
public class WindSpeed {
    private int time;
    private float xPara;
    private float yPara;
    private float speed;

    public WindSpeed(float speed) {
        this.speed = speed;
    }

    public WindSpeed() {
        this.speed = 55;
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

    public float getSpeed() {
        return speed;
    }

    public void setSpeed(float speed) {
        this.speed = speed;
    }
}
