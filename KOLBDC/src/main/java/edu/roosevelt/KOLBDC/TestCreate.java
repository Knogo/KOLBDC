/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;

/**
 *
 * @author kenom
 */
public class TestCreate {
    public static void main(String[] args) throws SQLException {

        Connection conn = DriverManager.getConnection("jdbc:derby://localhost:1527/KOLB", "kolb", "kolb");

        boolean succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE DIVER (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "PASSWORD VARCHAR(30),";
            sql = sql + "COINS INTEGER,";
            sql = sql + "UPGRADES VARCHAR(200),";
            sql = sql + "CLEARS VARCHAR(200))";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created DIVER");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE DIVER");
            }
        }
        
        String isql = "INSERT INTO DIVER VALUES (1, 'bob', 'cat', 5, 'vision', 'wind dungeon')";
        try {
                conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }
        
        succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE CREATOR (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "PASSWORD VARCHAR(30),";
            sql = sql + "COINS INTEGER,";
            sql = sql + "UPGRADES VARCHAR(200),";
            sql = sql + "CLEARS VARCHAR(200))";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created CREATOR");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE DUNGEON");
                conn.createStatement().execute("DROP TABLE CREATOR");
            }
        }
        
        isql = "INSERT INTO CREATOR VALUES (2, 'Lux', 'Ezreal', 20, 'vision', 'fire dungeon')";
        try {
            conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }

        succeeds = false;
         
        while (!succeeds) {
            String sql = "CREATE TABLE ADMIN (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "PASSWORD VARCHAR(30))";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created ADMIN");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE ADMIN");
            }
        }
        
        isql = "INSERT INTO ADMIN VALUES (3, 'LvL', 'Upppa')";
        try {
            conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }
        
        succeeds = false;
        
        while (!succeeds) {
            String sql = "CREATE TABLE DUNGEON (";
            sql = sql + "DID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "ID INTEGER REFERENCES CREATOR(ID),";
            sql = sql + "LAYOUT VARCHAR(2000),";
            sql = sql + "HIGHSCORE VARCHAR(30),";
            sql = sql + "MINMOVES INTEGER)";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created DUNGEON");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE DUNGEON");
            }
        }
        
        isql = "INSERT INTO DUNGEON VALUES (246, 'Test dungeon1', 2, '5, 5, [1, 1, 1, 1, 1, 2, 4, 1, 0, 3, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Garen', 5)";
        try {
            conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }
        isql = "INSERT INTO DUNGEON VALUES (5310, 'Test dungeon2', 2, '5, 5, [1, 1, 1, 1, 1, 2, 0, 1, 0, 3, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Morgana', 5)";
        try {
            conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }
        isql = "INSERT INTO DUNGEON VALUES (131, 'Test dungeon3', 2, '5, 5, [1, 1, 1, 1, 1, 2, 0, 0, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Graves', 5)";
        try {
            conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }
        isql = "INSERT INTO DUNGEON VALUES (2000, 'Test dungeon5', 2, '20, 20, [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]', 'Fizz', 5)";
        try {
            conn.createStatement().execute(isql);
        } catch (SQLException sQLException) {   }
    }
}
