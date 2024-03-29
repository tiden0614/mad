package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class RainfallAmount {
    private int time;
    private float xPara;
    private float yPara;
    private float amount; //mm

    public RainfallAmount() {

    }

    public int getTime() {
        return time;
    }

    public RainfallAmount(float amount) {
        this.amount = amount;
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


    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;

    }
}
