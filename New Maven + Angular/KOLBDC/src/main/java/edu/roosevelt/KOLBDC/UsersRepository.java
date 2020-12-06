/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author kenom
 */
public interface UsersRepository extends CrudRepository <Users, Integer>{
    Users findByID(int ID);
    Users findByName(String name);
    
    Boolean existsByName(String name);
}