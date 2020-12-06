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

/**
 *
 * @author kenom and level
 */
@Entity
@Table(name = "DIVER")
public class Diver implements Serializable  {
    @Id
    private int ID;
    private int coins;
    private int vision;
    private int keys;
    private String clears;

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

    public String getClears() {
        return clears;
    }

    public void setClears(String clears) {
        this.clears = clears;
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
