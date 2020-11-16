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
            List<Dungeon> result = (List<Dungeon>)dunDB.findAll();
            if (result == null || result.isEmpty()) {
                return new ResponseEntity(result, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity(result, HttpStatus.OK);
            }
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
    
    @PostMapping(value = {"/admin/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Admin> createAdmin(@RequestBody @Valid final Admin a) {
        if (adminDB.existsById(a.getID())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            adminDB.save(a);
            return new ResponseEntity(a, HttpStatus.OK);
        }
    }
    
    @PutMapping(value = {"/admin/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Admin> updateAdmin(@RequestBody @Valid final Admin a) {
        if (adminDB.existsById(a.getID())) {
            adminDB.save(a);
            return new ResponseEntity(a, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping({"/admin/{id}", "/{id}"})
    public ResponseEntity<Admin> deleteAdmin(@PathVariable("id") final int ID) {
        Admin a = new Admin(); a.setID(ID);
        if (adminDB.existsById(a.getID())) {
            a = adminDB.findByID(ID);
            adminDB.deleteById(ID);
            return new ResponseEntity(a, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = {"/dungeon/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Dungeon> createDungeon(@RequestBody @Valid final Dungeon d) {
        if (dunDB.existsById(d.getID())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            dunDB.save(d);
            return new ResponseEntity(d, HttpStatus.OK);
        }
    }
    
    @PutMapping(value = {"/dungeon/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Dungeon> updateDungeon(@RequestBody @Valid final Dungeon d) {
        if (dunDB.existsById(d.getID())) {
            dunDB.save(d);
            return new ResponseEntity(d, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping({"/dungeon/{did}", "/{did}"})
    public ResponseEntity<Dungeon> deleteDungeon(@PathVariable("did") final int DID) {
        Dungeon d = new Dungeon(); d.setDID(DID);
        if (dunDB.existsById(d.getID())) {
            d = dunDB.findByDID(DID);
            dunDB.deleteById(DID);
            return new ResponseEntity(d, HttpStatus.OK);
        } else {
            return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
}
