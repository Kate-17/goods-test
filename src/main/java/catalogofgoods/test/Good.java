package catalogofgoods.test;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
@ToString(of = {"id", "nameOfGood","descriptionOfGood","categoryOfGood"})
@EqualsAndHashCode(of = {"id"})
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nameOfGood;
    private String descriptionOfGood;
    private String categoryOfGood;


    public String getCategoryOfGood() {
        return categoryOfGood;
    }

    public void setCategoryOfGood(String categoryOfGood) {
        this.categoryOfGood = categoryOfGood;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameOfGood() {
        return nameOfGood;
    }

    public void setNameOfGood(String nameOfGood) {
        this.nameOfGood = nameOfGood;
    }

    public String getDescriptionOfGood() {
        return descriptionOfGood;
    }

    public void setDescriptionOfGood(String descriptionOfGood) {
        this.descriptionOfGood = descriptionOfGood;
    }


}