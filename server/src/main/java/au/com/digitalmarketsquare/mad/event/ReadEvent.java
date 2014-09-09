package au.com.digitalmarketsquare.mad.event;

/**
 * Created by tiden on 9/9/14.
 */
public class ReadEvent {
    private boolean entityFound = false;
    public boolean isEntityFound() {
        return entityFound;
    }
    public void setEntityFound(boolean found) {
        this.entityFound = found;
    }
}
