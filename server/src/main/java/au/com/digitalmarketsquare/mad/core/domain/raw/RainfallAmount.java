package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Administrator on 2014/9/19.
 */
public class RainfallAmount {
    private int time;
    private float xPara;
    private float yPara;
    private float amount;

    public RainfallAmount(float amount) {
        this.amount = amount;
    }

    public RainfallAmount() {
        this.amount = 3;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
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
