/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

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
                conn.createStatement().execute("INSERT INTO DIVER VALUES (10000, 5, 4, 5)");
        } catch (SQLException sQLException) {   }
        
        try {
                conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'diver', 'diver', 'diver')");
                conn.createStatement().execute("INSERT INTO DIVER VALUES (10001, 10, 1, 1)");
        } catch (SQLException sQLException) {   }

        succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE CREATOR (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "COINS INTEGER,";
            sql = sql + "MAXDIMS INTEGER,";
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
            conn.createStatement().execute("INSERT INTO CREATOR VALUES (10002, 20, 20)");
        } catch (SQLException sQLException) {   }
        
        try {
            conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'creator', 'creator', 'creator')");
            conn.createStatement().execute("INSERT INTO CREATOR VALUES (10003, 5, 5)");
        } catch (SQLException sQLException) {   }
        
        try {
            conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'LvL', 'Upppa', 'admin')");
        } catch (SQLException sQLException) {   }
        
        try {
            conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'ken', 'ken', 'admin')");
        } catch (SQLException sQLException) {   }
        
        try {
            conn.createStatement().execute("INSERT INTO USERS VALUES (DEFAULT, 'admin', 'admin', 'admin')");
        } catch (SQLException sQLException) {   }
        
        succeeds = false;
        
        while (!succeeds) {
            String sql = "CREATE TABLE DUNGEON (";
            sql = sql + "DID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 100000, INCREMENT BY 1),";
            sql = sql + "NAME VARCHAR(50),";
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
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (DEFAULT, 'Test dungeon1', 'lux', '5, 5, [1, 1, 1, 1, 1, 2, 4, 1, 0, 3, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Garen', 999)");
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (DEFAULT, 'Test dungeon2', 'lux', '5,5, [2,0,1,1,1,1,0,1,1,1,0,0,1,1,1,0,1,5,0,3,0,4,0,1,1]', 'Morgana', 999)");
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (DEFAULT, 'Test dungeon3', 'lux', '5, 5, [1, 1, 1, 1, 1, 2, 0, 0, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]', 'Graves', 999)");
            conn.createStatement().execute("INSERT INTO DUNGEON VALUES (DEFAULT, 'Test dungeon5', 'lux', '20, 20, [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]', 'Fizz', 999)");
        } catch (SQLException sQLException) {   }
    }
}
