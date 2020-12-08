/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.roosevelt.KOLBDC;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class Controller {

    private static final Logger logger = LoggerFactory.getLogger(Controller.class); //Error Handling

    @Autowired
    DiverRepository divDB; //For Divers

    @Autowired
    CreatorRepository creDB; //For Creators

    @Autowired
    UsersRepository uDB; //For Users

    @Autowired
    DungeonRepository dunDB; //For Dungeons

    @GetMapping({"/user/logout/"})
    public ResponseEntity<String> invalidate(HttpServletRequest req) {
        req.getSession().invalidate();
        logger.info("Logged out");
        return new ResponseEntity("Logged out", HttpStatus.OK);
    }

    // Purely for testing
//    @GetMapping({"/user/home/"})
//    public String testHome(HttpSession session) {
//        String result = "Not logged in";
//        if ((session != null) && (session.getAttribute("user") != null)) {
//            Users user = (Users)session.getAttribute("user");
//            result = user.getName();
//            result = result + " " + user.getID();
//        }
//        return result;
//    }
    @PostMapping(value = "/user/login/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> login(@RequestBody final Users user, HttpSession session) {
        logger.info("User:" + user.getName() + " Pass: " + user.getPassword());

        if (uDB.existsByName(user.getName())) {
            Users real = uDB.findByName(user.getName());
            if (user.getPassword().equals(real.getPassword())) {
                session.setAttribute("user", real);
                return new ResponseEntity(real, HttpStatus.OK);
            } else {
                return new ResponseEntity(user, HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(user, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping({"/users/", "/users/{id}"})
    public ResponseEntity<List<Users>> getUsers(@PathVariable(value = "id", required = false) final Integer id, HttpServletRequest req) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) { //Check if user is admin -- only admin should expose other users
            if (id != null) {
                if (uDB.existsById(id)) {
                    Users u = uDB.findByID(id);
                    return new ResponseEntity(u, HttpStatus.OK);
                } else {
                    return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
                }
            } else { //Find all, only admins allowed
                List<Users> result = (List<Users>) uDB.findAll();
                if (result == null || result.isEmpty()) {
                    return new ResponseEntity(result, HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity(result, HttpStatus.OK);
                }
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping({"/diver/", "/diver/{id}"})
    public ResponseEntity<List<Diver>> getDivers(@PathVariable(value = "id", required = false)
            final Integer id, HttpServletRequest req) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU != null) { //Check if user is logged in
            if (id != null) {
                if (divDB.existsById(id)) {
                    Diver d = divDB.findByID(id);
                    return new ResponseEntity(d, HttpStatus.OK);
                } else {
                    return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
                }
            } else if (logU.getRole().equals("admin")) { //Find all, only admins allowed
                List<Diver> result = (List<Diver>) divDB.findAll();
                if (result == null || result.isEmpty()) {
                    return new ResponseEntity(result, HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity(result, HttpStatus.OK);
                }
            } else { //Regular user tried to do find all
                return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping({"/creator/", "/creator/{id}"})
    public ResponseEntity<List<Creator>> getCreators(@PathVariable(value = "id", required = false)
            final Integer id, HttpServletRequest req) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU != null) {
            if (id != null) {
                if (creDB.existsById(id)) {
                    Creator c = creDB.findByID(id);
                    return new ResponseEntity(c, HttpStatus.OK);
                } else {
                    return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
                }
            } else if (logU.getRole().equals("admin")) { //Find all, only admins allowed
                List<Creator> result = (List<Creator>) creDB.findAll();
                if (result == null || result.isEmpty()) {
                    return new ResponseEntity(result, HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity(result, HttpStatus.OK);
                }
            } else { //Regular user tried to do find all
                return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping({"/dungeon/", "/dungeon/{did}"})
    public ResponseEntity<List<Dungeon>> getDungeons(@PathVariable(value = "did", required = false)
            final Integer did, HttpServletRequest req) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU != null) { //Only need to check for logged in
            if (did != null) {
                if (dunDB.existsById(did)) {
                    Dungeon d = dunDB.findByDID(did);
                    return new ResponseEntity(d, HttpStatus.OK);
                } else {
                    return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
                }
            } else {
                List<Dungeon> result = (List<Dungeon>) dunDB.findAll();
                if (result == null || result.isEmpty()) {
                    return new ResponseEntity(result, HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity(result, HttpStatus.OK);
                }
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = {"/users/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> createUsers(@RequestBody
            @Valid
            final Users u, HttpServletRequest req) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (uDB.existsById(u.getID()) || uDB.existsByName(u.getName())) {
            return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
        } else {
            //We need to not allow a custom id since they are autogenerated
            Users temp = new Users();
            temp.setName(u.getName());
            temp.setPassword(u.getPassword());
            if (logU.getRole().equals("admin") && (u.getRole().equals("creator") || u.getRole().equals("admin"))) { //Only admin can set role from start -- and you should only be able to set it to diver(default), creator, or admin
                temp.setRole(u.getRole());
            }
            logger.info(temp.getRole());
            uDB.save(temp);
            logger.info(temp.getRole());    
            //Now generate matching subtable
            if (temp.getRole().equals("diver")) {
                Diver d = new Diver();
                d.setID(temp.getID());
                divDB.save(d);
            } else if (temp.getRole().equals("creator")) {
                Creator c = new Creator();
                c.setID(temp.getID());
                creDB.save(c);
            }

            return new ResponseEntity(temp, HttpStatus.OK);
        }
    }

    @PutMapping(value = {"/users/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> updateUsers(@RequestBody
            @Valid
            final Users u, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU != null) { //Only logged in users should be able to edit their account
            if (uDB.existsByName(u.getName())) {
                return new ResponseEntity("Name in use already", HttpStatus.OK);
            } else if (uDB.existsById(u.getID())) {
                //We need to strip the role from non-admin users
                Users temp = new Users();
                temp.setID(u.getID());
                temp.setName(u.getName());
                temp.setPassword(u.getPassword());

                if (u.getRole().equals("creator")) { //Creator stays creator
                    temp.setRole(u.getRole());
                } else if (logU.getRole().equals("admin") && (u.getRole().equals("admin"))) { //Only admins can make others into admins
                    temp.setRole(u.getRole());
                }
                //The else is already defaulted --
                //If a creator tries to promote themselves to admin, they'll get demoted to diver instead

                //Changed role & needs entry in subtable
                if (temp.getRole().equals("diver") && !divDB.existsById(temp.getID())) {
                    Diver d = new Diver();
                    d.setID(temp.getID());
                    divDB.save(d);
                } else if (temp.getRole().equals("creator") && !creDB.existsById(temp.getID())) {
                    Creator c = new Creator();
                    c.setID(temp.getID());
                    creDB.save(c);
                }

                uDB.save(temp);
                return new ResponseEntity(temp, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping({"/users/{id}", "/{id}"})
    public ResponseEntity<Users> deleteUsers(@PathVariable("id")
            final int ID, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) { //Only admin can delete accounts
            Users u = new Users();
            u.setID(ID);
            if (uDB.existsById(u.getID())) {
                u = uDB.findByID(ID);
                uDB.deleteById(ID);
                return new ResponseEntity(u, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = {"/diver/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Diver> createDiver(@RequestBody
            @Valid
            final Diver d, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("diver") || logU.getRole().equals("admin")) {
            if (divDB.existsById(d.getID())) {
                return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
            } else {
                divDB.save(d);
                return new ResponseEntity(d, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(value = {"/diver/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Diver> updateDiver(@RequestBody
            @Valid
            final Diver d, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU != null) {
            if (divDB.existsById(d.getID())) {
                divDB.save(d);
                return new ResponseEntity(d, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping({"/diver/{id}", "/{id}"})
    public ResponseEntity<Diver> deleteDiver(@PathVariable("id")
            final int ID, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) {
            Diver d = new Diver();
            d.setID(ID);
            if (divDB.existsById(d.getID())) {
                d = divDB.findByID(ID);
                divDB.deleteById(ID);
                return new ResponseEntity(d, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = {"/creator/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Creator> createCreator(@RequestBody
            @Valid
            final Creator c, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) {
            if (creDB.existsById(c.getID())) {
                return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
            } else {
                creDB.save(c);
                return new ResponseEntity(c, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(value = {"/creator/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Creator> updateCreator(@RequestBody
            @Valid
            final Creator c, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("creator") || logU.getRole().equals("admin")) {
            if (creDB.existsById(c.getID())) {
                creDB.save(c);
                return new ResponseEntity(c, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping({"/creator/{id}", "/{id}"})
    public ResponseEntity<Creator> deleteCreator(@PathVariable("id")
            final int ID, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) {
            Creator c = new Creator();
            c.setID(ID);
            if (creDB.existsById(c.getID())) {
                c = creDB.findByID(ID);
                creDB.deleteById(ID);
                return new ResponseEntity(c, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = {"/dungeon/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Dungeon> createDungeon(@RequestBody
            @Valid
            final Dungeon d, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("creator") || logU.getRole().equals("admin")) {
            if (dunDB.existsById(d.getDID())) {
                return new ResponseEntity("Already exists", HttpStatus.CONFLICT);
            } else {
                dunDB.save(d);
                return new ResponseEntity(d, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(value = {"/dungeon/", "/"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Dungeon> updateDungeon(@RequestBody
            @Valid
            final Dungeon d, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) { //Left this reserved to admins
            if (dunDB.existsById(d.getDID())) {
                dunDB.save(d);
                return new ResponseEntity(d, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping({"/dungeon/{did}", "/{did}"})
    public ResponseEntity<Dungeon> deleteDungeon(@PathVariable("did")
            final int DID, HttpServletRequest req
    ) {
        Users logU = (Users) req.getSession().getAttribute("user");

        if (logU.getRole().equals("admin")) { //Left this reserved to admins
            Dungeon d = new Dungeon();
            d.setDID(DID);
            if (dunDB.existsById(d.getDID())) {
                d = dunDB.findByDID(DID);
                dunDB.deleteById(DID);
                return new ResponseEntity(d, HttpStatus.OK);
            } else {
                return new ResponseEntity("Doesn't exist", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }
    }
}
