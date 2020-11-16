/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kenom
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class); //Error Handling
    
    @Autowired
    DiverRepository divDB; //For Divers
    
    @Autowired
    CreatorRepository creDB; //For Creators

    @Autowired
    AdminRepository adminDB; //For Creators
}
