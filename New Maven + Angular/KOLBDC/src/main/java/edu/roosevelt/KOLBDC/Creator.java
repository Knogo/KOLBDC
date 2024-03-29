/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;

/**
 *
 * @author Level
 */
@Entity
@Table(name = "CREATOR")
public class Creator implements Serializable {
    @Id
    private int ID;
    
    @Min(value = 0)
    private int coins = 0;

    @Min(value = 5)
    @Max(value = 25)
    private int maxdims = 5;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getCoins() {
        return coins;
    }

    public void setCoins(int coins) {
        this.coins = coins;
    }

    public int getMaxdims() {
        return maxdims;
    }

    public void setMaxdims(int maxdims) {
        this.maxdims = maxdims;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + this.ID;
        hash = 59 * hash + this.coins;
        hash = 59 * hash + this.maxdims;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Creator other = (Creator) obj;
        if (this.ID != other.ID) {
            return false;
        }
        if (this.coins != other.coins) {
            return false;
        }
        if (this.maxdims != other.maxdims) {
            return false;
        }
        return true;
    }

    
}
