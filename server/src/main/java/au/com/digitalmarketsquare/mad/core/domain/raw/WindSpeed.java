package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
<<<<<<< HEAD
 * Created by Gao Jiang on 2014/9/18.
=======
 * Created by Administrator on 2014/9/19.
>>>>>>> d92deb51f0fbef5bca9c59401378c941ca59f641
 */
public class WindSpeed {
    private int time;
    private float xPara;
    private float yPara;
    private float speed; //present in unit-km/h

    public WindSpeed() {

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
