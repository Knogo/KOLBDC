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
public interface DiverRepository extends CrudRepository <Diver, Integer>{
    Diver findByID(int ID);
}
