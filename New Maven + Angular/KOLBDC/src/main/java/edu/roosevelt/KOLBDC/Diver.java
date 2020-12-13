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
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

/**
 *
 * @author kenom and level
 */
@Entity
@Table(name = "DIVER")
public class Diver implements Serializable  {
    @Id
    private int ID;
    
    @Min(value = 0)
    private int coins = 0;
    
    @Min(value = 1)
    @Max(value = 4)
    private int vision = 1;
    
    @Min(value = 1)
    @Max(value = 10)
    private int keys = 1;

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

    public int getVision() {
        return vision;
    }

    public void setVision(int vision) {
        this.vision = vision;
    }

    public int getKeys() {
        return keys;
    }

    public void setKeys(int keys) {
        this.keys = keys;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + this.ID;
        hash = 67 * hash + this.coins;
        hash = 67 * hash + this.vision;
        hash = 67 * hash + this.keys;
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
        final Diver other = (Diver) obj;
        if (this.ID != other.ID) {
            return false;
        }
        if (this.coins != other.coins) {
            return false;
        }
        if (this.vision != other.vision) {
            return false;
        }
        if (this.keys != other.keys) {
            return false;
        }
        return true;
    }

    
}
