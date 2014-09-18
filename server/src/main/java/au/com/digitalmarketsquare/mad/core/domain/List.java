package au.com.digitalmarketsquare.mad.core.domain;

/**
 * Created by Gao Jiang on 2014/9/18.
 */
public class List {
    private ListItem[] listItem=new ListItem[7];
    int i;

    public List() {

        for(i=0;i<7;i++){
            listItem[i] = new ListItem();
            listItem[i].setCurrentTemp("21 C");
            listItem[i].setMaxTemp("25 C");
            listItem[i].setMinTemp("17 C");
            listItem[i].setHumidity("70%");
            listItem[i].setRainfallAmount("20mm");
            listItem[i].setRainfallChance("10%");
        }

    }

    public List(ListItem[] listItem) {
        this.listItem = listItem;
    }

    public ListItem[] getListItem() {
        return listItem;
    }

    public void setListItem(ListItem[] listItem) {
        this.listItem = listItem;
    }
}
