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
            sql = sql + "UPGRADES VARCHAR(30),";
            sql = sql + "CLEARS VARCHAR(30))";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created DIVER");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE DIVER");
            }
        }
        
        succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE CREATOR (";
            sql = sql + "ID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "PASSWORD VARCHAR(30),";
            sql = sql + "COINS INTEGER,";
            sql = sql + "UPGRADES VARCHAR(30),";
            sql = sql + "CLEARS VARCHAR(30))";

            try {
                conn.createStatement().execute(sql);
                System.out.println("Created CREATOR");
                succeeds = true;
            } catch (SQLException sqle) {
                conn.createStatement().execute("DROP TABLE CREATOR");
            }
        }
        
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
        
        succeeds = false;

        while (!succeeds) {
            String sql = "CREATE TABLE DUNGEON (";
            sql = sql + "DID INTEGER PRIMARY KEY,";
            sql = sql + "NAME VARCHAR(30),";
            sql = sql + "CREATOR VARCHAR(30),";
            sql = sql + "ID INTEGER,";
            sql = sql + "LAYOUT VARCHAR(30)";
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
    }
}
