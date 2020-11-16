/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    AdminRepository adminDB; //For Admins
    
    @Autowired
    DungeonRepository dunDB; //For Dungeons
    
    @GetMapping({"/diver/","/diver/{id}"})
    public ResponseEntity<List<Diver>> getDivers(@PathVariable(value = "id", required = false) final Integer id) {
        if (id != null) {
            if (divDB.existsById(id)) {
                Diver d = divDB.findByID(id);
                List<Diver> result = new ArrayList();
                result.add(d);
                return new ResponseEntity(result, HttpStatus.OK);
            } else {
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
        } else {
            List<Diver> result = (List<Diver>)divDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
        }
    }
    
    @GetMapping({"/creator/","/creator/{id}"})
    public ResponseEntity<List<Creator>> getCreators(@PathVariable(value = "id", required = false) final Integer id) {
        if (id != null) {
            if (creDB.existsById(id)) {
                Creator c = creDB.findByID(id);
                List<Creator> result = new ArrayList();
                result.add(c);
                return new ResponseEntity(result, HttpStatus.OK);
            } else {
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
        } else {
            List<Creator> result = (List<Creator>)creDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
        }
    }
    
    @GetMapping({"/admin/","/admin/{id}"})
    public ResponseEntity<List<Admin>> getAdmins(@PathVariable(value = "id", required = false) final Integer id) {
        if (id != null) {
            if (adminDB.existsById(id)) {
                Admin a = adminDB.findByID(id);
                List<Admin> result = new ArrayList();
                result.add(a);
                return new ResponseEntity(result, HttpStatus.OK);
            } else {
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
        } else {
            List<Admin> result = (List<Admin>)adminDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
        }
    }
    
    @GetMapping({"/dungeon/","/dungeon/{did}"})
    public ResponseEntity<List<Dungeon>> getDungeons(@PathVariable(value = "did", required = false) final Integer did) {
        if (did != null) {
            if (dunDB.existsById(did)) {
                Dungeon d = dunDB.findByDID(did);
                List<Dungeon> result = new ArrayList();
                result.add(d);
                return new ResponseEntity(result, HttpStatus.OK);
            } else {
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
        } else {
            List<Admin> result = (List<Admin>)adminDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
        }
    }
}
