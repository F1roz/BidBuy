package controllers;

import dtos.JwtPayloadDto;
import dtos.ProductDto;
import dtos.UserDto;
import lombok.RequiredArgsConstructor;
import model.Product;
import model.ProductCategory;
import model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.ProductCategoryService;
import services.ProductService;
import services.UserService;
import utils.HashMapItem;
import utils.HashMapUtils;
import utils.JwtUtils;
import utils.NumberUtils;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final UserService userService;
    private final ProductCategoryService productCategoryService;

    @GetMapping("/")
    public List<ProductDto> getAll(
            @RequestParam(name = "page", required = false) String page,
            @RequestParam(name = "view", required = false) String viewPerPage
    ) {
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.productService
                .getAll(
                        Math.max(pageNo, 1),
                        Math.max(view, 10)
                );
    }

    @GetMapping("/categories")
    public List<ProductCategory> getAllCategories() {
        return this.productCategoryService.getAll();
    }

    @GetMapping("/count")
    public Integer getAllCount() {
        return this.productService.getAllCount();
    }

    @GetMapping("/{id}")
    public ProductDto getById(@PathVariable(name = "id", required = true) int id) {
        return this.productService.getById(id);
    }

    @GetMapping("/getByIdUser")
    public UserDto getByIdUser(@RequestParam(name = "id", required = true) int id) {
        return this.productService.getById(id).getSeller();
    }

    @GetMapping("/getByName")
    public Product getByName(@RequestParam(name = "name", required = true) String name) {
        return this.productService.getByName(name);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam(name = "id", required = true) int id) {
        this.productService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestParam(name = "id", required = true) int id, @RequestParam(name = "product", required = true) Product product) {
        this.productService.update(product);
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> create(@RequestBody Product product, @RequestHeader("Authorization") String Authorization) {
        JwtPayloadDto loggedInUser = JwtUtils.getLoggedInUser(Authorization);
        if (loggedInUser == null) return new ResponseEntity<>(HashMapUtils.build(
                HashMapItem.build("message", "Unauthenticated")
        ), HttpStatus.UNAUTHORIZED);
        User seller = userService.getByUsername(loggedInUser.getUsername());
        if (seller == null) return new ResponseEntity<>(HashMapUtils.build(
                HashMapItem.build("message", "User not found in db")
        ), HttpStatus.BAD_REQUEST);
        product.setSeller(seller);
        this.productService.save(product);
        return new ResponseEntity<>(HashMapUtils.build(HashMapItem.build("product", product)), HttpStatus.CREATED);
    }

    @GetMapping("/getProductByUserName/{username}")
    public List<ProductDto> getProductByUserName(@RequestParam(name = "page", required = false) String page,
                                                 @RequestParam(name = "view", required = false) String viewPerPage,
                                                 @PathVariable(name = "username", required = true) String username) {
        int id = this.userService.getIdByUsername(username);
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.productService.getProductBySellerId(
                Math.max(pageNo, 1),
                Math.max(view, 10),
                id
        );
    }
    //get status approved product only
    @GetMapping("/getAllListedProduct/")
    public List<ProductDto> getAllListedProduct(@RequestParam(name = "page", required = false) String page,
                                                 @RequestParam(name = "view", required = false) String viewPerPage) {
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        return this.productService.getAllListedProduct(
                Math.max(pageNo, 1),
                Math.max(view, 10)
        );
    }


    //change product status
    @PutMapping("/changeStatus")
    public void changeStatus(@RequestParam(name = "id", required = true) int id, @RequestParam(name = "status", required = true) String status) {
        this.productService.changeStatus(id,  status);
    }


}
