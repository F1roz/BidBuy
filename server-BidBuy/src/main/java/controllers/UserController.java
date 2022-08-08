package controllers;

import model.User;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import services.UserService;
import utils.NumberUtils;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        webDataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }
    @RequestMapping("/")
    public List<User> getAll(
            @RequestParam(name = "page",required = false) String page,
            @RequestParam(name = "view",required = false) String viewPerPage
    ){
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.userService.getAll(
                Math.max(pageNo, 1),
                Math.max(view, 10)
        );
    }
    @RequestMapping ("/count")
    public Integer getAllCount(){return this.userService.getAllCount();}
    @RequestMapping ("/getById")
    public User getById(@RequestParam(name = "id",required = true) int id){
        return this.userService.getById(id);
    }
    @RequestMapping ("/getByName")
    public User getByName(@RequestParam(name = "name",required = true) String name){
        return this.userService.getByUsername(name);
    }
    @RequestMapping("/delete")
    public void delete(@RequestParam(name = "id",required = true) int id){
        this.userService.delete(id);
    }
    @RequestMapping("/update")
    public void update(User user){
        this.userService.update(user);
    }
    @RequestMapping("/save")
    public void save(User user){
        this.userService.save(user);
    }



}
