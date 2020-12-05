/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    UsersRepository usersDB;
    
    @Autowired
    DungeonRepository dunDB; //For Dungeons
    
    @GetMapping({"/users/","/users/{id}"})
    public ResponseEntity<List<Users>> getUsers(@PathVariable(value = "id", required = false) final Integer id) {
        if (id != null) {
            if (usersDB.existsById(id)) {
                Users u = usersDB.findByID(id);
                return new ResponseEntity(u, HttpStatus.OK);
            } else {
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
        } else {
            List<Users> result = (List<Users>)usersDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
        }
    }
    
    @GetMapping({"/diver/","/diver/{id}"})
    public ResponseEntity<List<Diver>> getDivers(@PathVariable(value = "id", required = false) final Integer id) {
        if (id != null) {
            if (divDB.existsById(id)) {
                Diver d = divDB.findByID(id);
                return new ResponseEntity(d, HttpStatus.OK);
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
                return new ResponseEntity(c, HttpStatus.OK);
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
    
    @GetMapping({"/dungeon/","/dungeon/{did}"})
    public ResponseEntity<List<Dungeon>> getDungeons(@PathVariable(value = "did", required = false) final Integer did) {
        if (did != null) {
            if (dunDB.existsById(did)) {
                Dungeon d = dunDB.findByDID(did);
                return new ResponseEntity(d, HttpStatus.OK);
            } else {
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
        } else {
            List<Dungeon> result = (List<Dungeon>)dunDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
        }
    }
    
    @PostMapping(value = {"/users/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> createUsers(@RequestBody @Valid final Users u) {
        if (usersDB.existsById(u.getID()) || usersDB.existsByName(u.getName())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            usersDB.save(u);
            return new ResponseEntity(u, HttpStatus.OK);
        }
    }
    
    @PutMapping(value = {"/users/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> updateUsers(@RequestBody @Valid final Users u) {
        if (usersDB.existsByName(u.getName())) {
            return new ResponseEntity("Name in use already", HttpStatus.OK);
        } else if (usersDB.existsById(u.getID())) {
            usersDB.save(u);
            return new ResponseEntity(u, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping({"/users/{id}", "/{id}"})
    public ResponseEntity<Users> deleteUsers(@PathVariable("id") final int ID) {
        Users u = new Users(); u.setID(ID);
        if (usersDB.existsById(u.getID())) {
            u = usersDB.findByID(ID);
            usersDB.deleteById(ID);
            return new ResponseEntity(u, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = {"/diver/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Diver> createDiver(@RequestBody @Valid final Diver d) {
        if (divDB.existsById(d.getID())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            divDB.save(d);
            return new ResponseEntity(d, HttpStatus.OK);
        }
    }
    
    @PutMapping(value = {"/diver/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Diver> updateDiver(@RequestBody @Valid final Diver d) {
        if (divDB.existsById(d.getID())) {
            divDB.save(d);
            return new ResponseEntity(d, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping({"/diver/{id}", "/{id}"})
    public ResponseEntity<Diver> deleteDiver(@PathVariable("id") final int ID) {
        Diver d = new Diver(); d.setID(ID);
        if (divDB.existsById(d.getID())) {
            d = divDB.findByID(ID);
            divDB.deleteById(ID);
            return new ResponseEntity(d, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = {"/creator/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Creator> createCreator(@RequestBody @Valid final Creator c) {
        if (creDB.existsById(c.getID())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            creDB.save(c);
            return new ResponseEntity(c, HttpStatus.OK);
        }
    }
    
    @PutMapping(value = {"/creator/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Creator> updateCreator(@RequestBody @Valid final Creator c) {
        if (creDB.existsById(c.getID())) {
            creDB.save(c);
            return new ResponseEntity(c, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping({"/creator/{id}", "/{id}"})
    public ResponseEntity<Creator> deleteCreator(@PathVariable("id") final int ID) {
        Creator c = new Creator(); c.setID(ID);
        if (creDB.existsById(c.getID())) {
            c = creDB.findByID(ID);
            creDB.deleteById(ID);
            return new ResponseEntity(c, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = {"/dungeon/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Dungeon> createDungeon(@RequestBody @Valid final Dungeon d) {
        if (dunDB.existsById(d.getDID())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            dunDB.save(d);
            return new ResponseEntity(d, HttpStatus.OK);
        }
    }
    
    @PutMapping(value = {"/dungeon/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Dungeon> updateDungeon(@RequestBody @Valid final Dungeon d) {
        if (dunDB.existsById(d.getDID())) {
            dunDB.save(d);
            return new ResponseEntity(d, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping({"/dungeon/{did}", "/{did}"})
    public ResponseEntity<Dungeon> deleteDungeon(@PathVariable("did") final int DID) {
        Dungeon d = new Dungeon(); d.setDID(DID);
        if (dunDB.existsById(d.getDID())) {
            d = dunDB.findByDID(DID);
            dunDB.deleteById(DID);
            return new ResponseEntity(d, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
}
