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
 * @author kenom
 */
@Entity
@Table(name = "DUNGEON")
public class Dungeon implements Serializable {
    @Id
    private int DID;
    private String name;
    private String creator;
    private int ID; //creator ID (for easier deletion)
    private String[][] layout;
    private String highscore; //The name of the high-scorer
    private int minmoves;

    public int getDID() {
        return DID;
    }

    public void setDID(int DID) {
        this.DID = DID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String[][] getLayout() {
        return layout;
    }

    public void setLayout(String[][] layout) {
        this.layout = layout;
    }

    public String getHighscore() {
        return highscore;
    }

    public void setHighscore(String highscore) {
        this.highscore = highscore;
    }

    public int getMinmoves() {
        return minmoves;
    }

    public void setMinmoves(int minmoves) {
        this.minmoves = minmoves;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + this.DID;
        hash = 17 * hash + this.ID;
        hash = 17 * hash + this.minmoves;
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
        final Dungeon other = (Dungeon) obj;
        if (this.DID != other.DID) {
            return false;
        }
        if (this.ID != other.ID) {
            return false;
        }
        if (this.minmoves != other.minmoves) {
            return false;
        }
        return true;
    }
    
    
}
