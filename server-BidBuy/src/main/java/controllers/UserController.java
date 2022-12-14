package controllers;

import dtos.UserDto;
import lombok.RequiredArgsConstructor;
import model.User;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import services.UserService;
import utils.NumberUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        webDataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @GetMapping("/")
    public List<UserDto> getAll(
            @RequestParam(name = "page", required = false) String page,
            @RequestParam(name = "view", required = false) String viewPerPage
    ) {
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.userService
                .getAll(
                        Math.max(pageNo, 1),
                        Math.max(view, 10)
                ).stream().map(UserDto::fromDbWithRelations).collect(Collectors.toList());
    }

    @GetMapping("/count")
    public Integer getAllCount() {
        return this.userService.getAllCount();
    }

    @GetMapping("/{id}")
    public UserDto getById(@PathVariable(name = "id", required = true) int id) {
        return UserDto.fromDbWithRelations(this.userService.getById(id));
    }

    @GetMapping("/getByName")
    public User getByName(@RequestParam(name = "name", required = true) String name) {
        return this.userService.getByUsername(name);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam(name = "id", required = true) int id) {
        this.userService.delete(id);
    }

    @PutMapping("/update")
    public void update(User user) {
        this.userService.update(user);
    }

    @PostMapping("/save")
    public void save(@RequestBody User user) {
        this.userService.save(user);
    }

    @GetMapping("/getIdByUsername")
    public int getIdByUsername(@RequestParam(name = "username", required = true) String username) {
        return this.userService.getIdByUsername(username);
    }


}
