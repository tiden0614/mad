package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Administrator on 2014/9/19.
 */
public class WindDirect {
    private int time;
    private float xPara;
    private float yPara;
    private float dir;

    public WindDirect(float dir) {
        this.dir = dir;
    }

    public WindDirect() {
        this.dir = 90;
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

    public float getDir() {
        return dir;
    }

    public void setDir(float dir) {
        this.dir= dir;
    }
}
