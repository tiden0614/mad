package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class WindDirection {
    private int time;
    private float xPara;
    private float yPara;
    private float direction; //present the angle degree

    public WindDirection() {
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

    public float getDirection() {
        return direction;
    }

    public void setDirection(float direction) {
        this.direction = direction;
    }
}
