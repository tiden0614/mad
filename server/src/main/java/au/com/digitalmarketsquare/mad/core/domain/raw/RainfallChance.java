package au.com.digitalmarketsquare.mad.core.domain.raw;

/**
 * Created by Administrator on 2014/9/19.
 */
public class RainfallChance {
    private int time;
    private float xPara;
    private float yPara;
    private float chance;

    public RainfallChance(float chance) {
        this.chance = chance;
    }

    public RainfallChance() {
        this.chance = 50;
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

    public float getChance() {
        return chance;
    }

    public void setChance(float chance) {
        this.chance = chance;
    }
}
