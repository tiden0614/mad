package au.com.digitalmarketsquare.mad.event.list;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class LocationEvent {
    private double xPara;
    private double yPare;

    public LocationEvent() {
    }

    public LocationEvent(double xPara, double yPare) {
        this.xPara = xPara;
        this.yPare = yPare;
    }

    public double getxPara() {
        return xPara;
    }

    public void setxPara(double xPara) {
        this.xPara = xPara;
    }

    public double getyPare() {
        return yPare;
    }

    public void setyPare(double yPare) {
        this.yPare = yPare;
    }
}
