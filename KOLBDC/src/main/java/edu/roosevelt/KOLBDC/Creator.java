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
 * @author Level
 */
@Entity
@Table(name = "CREATOR")
public class Creator implements Serializable {
    @Id
    private int ID;
    private String name;
    private String password;
    private int coins;
    private String upgrades;
    private String clears;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getCoins() {
        return coins;
    }

    public void setCoins(int coins) {
        this.coins = coins;
    }

    public String getUpgrades() {
        return upgrades;
    }

    public void setUpgrades(String upgrades) {
        this.upgrades = upgrades;
    }

    public String getClears() {
        return clears;
    }

    public void setClears(String clears) {
        this.clears = clears;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + this.ID;
        hash = 59 * hash + this.coins;
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
        return true;
    }
}
