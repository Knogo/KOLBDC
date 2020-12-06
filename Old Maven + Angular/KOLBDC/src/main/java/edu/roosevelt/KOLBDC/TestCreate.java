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
            String sql = "CREATE TABLE USERS (";
            sql = sql + "ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 10000, INCREMENT BY 1),";
            sql = sql + "NAME VARCHAR(30) UNIQUE NOT NULL,";
            sql = sql + "PASSWORD VARCHAR(30) NOT NULL,";
            sql = sql + "ROLE VARCHAR(30) NOT NULL)";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created USERS");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE CREATOR");
                conn.createStatement().execute("DROP TABLE DIVER");
                conn.createStatement().execute("DROP TABLE USERS");
            }
        }
        
        succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE DIVER (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "COINS INTEGER,";
            sql = sql + "VISION INTEGER,";
            sql = sql + "KEYS INTEGER,";
            sql = sql + "CLEARS VARCHAR(2000),";
            sql = sql + "FOREIGN KEY (ID) REFERENCES USERS(ID) ON DELETE CASCADE)";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created DIVER");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE DIVER");
            }
        }
        
        try {
                conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'bob', 'cat', 'diver')");
                conn.createStatement().execute("INSERT INTO DIVER VALUES (10000, 5, 4, 5, 'wind dungeon')");
        } catch (SQLException sQLException) {   }

        succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE CREATOR (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "COINS INTEGER,";
            sql = sql + "MAXDIMS INTEGER,";
            sql = sql + "CLEARS VARCHAR(2000),";
            sql = sql + "FOREIGN KEY (ID) REFERENCES USERS(ID) ON DELETE CASCADE)";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created CREATOR");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE CREATOR");
            }
        }
        
        try {
            conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'lux', 'ezreal', 'creator')");
            conn.createStatement().execute("INSERT INTO CREATOR VALUES (10001, 20, 25, 'wind dungeon')");
        } catch (SQLException sQLException) {   }
        
        try {
            conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'LvL', 'Upppa', 'admin')");
        } catch (SQLException sQLException) {   }
        
        succeeds = false;
        
        while (!succeeds) {
            String sql = "CREATE TABLE DUNGEON (";
            sql = sql + "DID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "CNAME VARCHAR(30),";
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
        
        try {
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (246, 'Test dungeon1', 'lux', '5, 5, [1, 1, 1, 1, 1, 2, 4, 1, 0, 3, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Garen', 5)");
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (5310, 'Test dungeon2', 'lux', '5, 5, [1, 1, 1, 1, 1, 2, 0, 1, 0, 3, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Morgana', 5)");
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (131, 'Test dungeon3', 'lux', '5, 5, [1, 1, 1, 1, 1, 2, 0, 0, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Graves', 5)");
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (2000, 'Test dungeon5', 'lux', '20, 20, [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]', 'Fizz', 5)");
        } catch (SQLException sQLException) {   }
    }
}
